// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const jwtFormatter = require('./lib/decodeJwt');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "whatthejwt" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        var getCurrentCursorRange = function() {
            var textEditor = vscode.window.activeTextEditor;
            var currentSelection = textEditor.selection;
            var beginPos = currentSelection.start;
            var endPos = currentSelection.end;
            var range = new vscode.Range(beginPos, endPos);
            return range;
        }

        var getCurrentlySelectedText = function() {
            var currentRange = getCurrentCursorRange();
            return vscode.window.activeTextEditor.document.getText(currentRange);
        }

        var replaceCurrentlySelectedText = function (newText) {
            var textEditor = vscode.window.activeTextEditor;
            var currentRange = getCurrentCursorRange();
            var workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.replace(textEditor.document.uri, currentRange, newText);
            vscode.workspace.applyEdit(workspaceEdit);            
        }
        
        var jwt = getCurrentlySelectedText();
        var readableJwt = jwtFormatter.decode(jwt);
        replaceCurrentlySelectedText(jwt + " \r\n" + readableJwt);
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;