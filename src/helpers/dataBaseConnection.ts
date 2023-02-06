    import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";

    const sqlite = new SQLiteConnection(CapacitorSQLite);
    export let db: SQLiteDBConnection;

    export const createConn = async () => {
    try {
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection("db_tab3", false)).result;

        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_tab3", false);
        } else {
            db = await sqlite.createConnection("db_tab3", false, "no-encryption", 1, false);
        }
        await db.open();

     // tablo oluşturma query'si her bağlantı oluşturma isteğinde çalıştırılıyor
    //  bunun önüne geçmek istenirse query farklı bir yerde çalıştırılabilir
    const query = `
     CREATE TABLE IF NOT EXISTS tank_table (
      tankName TEXT,
      tankNumber INTEGER,
      parcelNumber INTEGER,
      cargo TEXT,
      capacity INTEGER,
      fullness INTEGER,
      weight INTEGER,
      goodDensity INTEGER
    );
    CREATE TABLE IF NOT EXISTS goods_table (
      goodName TEXT,
      goodNumber INTEGER,
      density INTEGER
    );
    `
    const res = await db.execute(query);
    if(res.changes && res.changes.changes && res.changes.changes < 0) {
        new Error(`Error: execute failed`);
    }

    } catch (e) {
        alert('Veritabanı Hatası')
        console.log(e)
    }
 }
