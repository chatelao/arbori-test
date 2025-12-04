// test_runner.js
var formatFile = args[1]; // Die SQL Datei zum Testen
var arboriFile = args[2]; // Deine custom.arbori

// Importiere notwendige Klassen (Reflection/Internal API Nutzung - "Hacking" Style)
var Format = Java.type('oracle.dbtools.app.Format');

try {
    // Setze die Optionen
    ctx.write("Lade Arbori Datei: " + arboriFile + "\n");
    
    // Wir nutzen den Command-Listener von SQLcl um die Regeln zu setzen
    sqlcl.setStmt("format rules " + arboriFile);
    sqlcl.run();

    // Führe die Formatierung aus
    ctx.write("Formatiere: " + formatFile + "\n");
    sqlcl.setStmt("format file " + formatFile + " " + formatFile + ".out");
    sqlcl.run();
    
    ctx.write("SUCCESS: Formatierung abgeschlossen.\n");
} catch (e) {
    ctx.write("ERROR: Arbori Syntaxfehler oder Laufzeitfehler.\n");
    ctx.write(e.message + "\n");
    // Exit Code 1 erzwingen, damit die Pipeline fehlschlägt
    java.lang.System.exit(1); 
}
