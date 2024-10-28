import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
} from '@angular-devkit/schematics';
import * as ts from 'typescript';

function camelToSnakeCaseWithPrefix(name: string): string {
  return 'TESTDATA_' + name
    .replace(/Mock|TestData|testdata/g, '') // Remove 'Mock', 'TestData', 'testdata'
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // Convert camelCase to snake_case
    .toUpperCase();
}


// Function to transform and track constants in .testdata.ts files
function replaceConstantsInFile(content: string, replacements: Map<string, string>): string {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const transformer = (context: ts.TransformationContext) => {
    const visit: ts.Visitor = (node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        /^[a-z][a-zA-Z0-9]*$/.test(node.name.text)
      ) {
        const oldName = node.name.text;
        const newName = camelToSnakeCaseWithPrefix(oldName);
        replacements.set(oldName, newName); // Track old and new names

        return ts.factory.updateVariableDeclaration(
          node,
          ts.factory.createIdentifier(newName),
          node.exclamationToken, // Preserves the original token if it exists
          node.type,
          node.initializer
        );
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: ts.Node): ts.Node => ts.visitNode(node, visit) ?? node;
  };


  const result = ts.transform(sourceFile, [transformer]);
  const printer = ts.createPrinter();
  return printer.printFile(result.transformed[0] as ts.SourceFile);
}

// Function to update references across all files
function updateReferences(tree: Tree, replacements: Map<string, string>) {
  console.log(replacements);

  tree.visit((filePath) => {
    // Skip unwanted directories like node_modules and dist
    if (filePath.includes('node_modules') || filePath.includes('dist')) {
      return;
    }

    const fileBuffer = tree.read(filePath);
    if (!fileBuffer) {
      throw new SchematicsException(`Could not read file: ${filePath}`);
    }

    let content = fileBuffer.toString('utf-8');
    let updatedContent = content; // Create a copy for modifications

    // Perform replacements
    replacements.forEach((newName, oldName) => {
      const regex = new RegExp(`\\b${oldName}\\b`, 'g'); // Match whole words only
      updatedContent = updatedContent.replace(regex, newName);
    });

    // Only overwrite if there was a change
    if (updatedContent !== content) {
      tree.overwrite(filePath, updatedContent);
    }
  });
}


export function mySchematic(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const replacements = new Map<string, string>();

    // First pass: Rename constants in .testdata.ts files and track the changes
    tree.visit((filePath) => {
      if (
        filePath.includes('node_modules') ||
        filePath.includes('dist') ||      // Optionally exclude other folders
        !filePath.endsWith('.testdata.ts')
      ) {
        return;
      }

      const fileBuffer = tree.read(filePath);
      if (!fileBuffer) {
        throw new SchematicsException(`Could not read file: ${filePath}`);
      }
      const content = fileBuffer.toString('utf-8');
      const updatedContent = replaceConstantsInFile(content, replacements);
      tree.overwrite(filePath, updatedContent);
    });

    // Second pass: Update references in other TypeScript files
    updateReferences(tree, replacements);

    return tree;
  };
}

