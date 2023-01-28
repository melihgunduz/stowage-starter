    import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";

    const sqlite = new SQLiteConnection(CapacitorSQLite);
    let db: SQLiteDBConnection;

    export const createConn = async () => {
    try {
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection("db_tab3", false)).result;

        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_tab3", false);
        } else {
            alert('veritabanı bulunamadı bağlantı oluşturuluyor')
            db = await sqlite.createConnection("db_tab3", false, "no-encryption", 1, false);
        }
        await db.open();

        const query = `
     CREATE TABLE IF NOT EXISTS tank_table (
      tankName TEXT NOT NULL PRIMARY KEY,
      tankNumber INTEGER NOT NULL UNIQUE,
      parcelNumber INTEGER NOT NULL
    );
    `
        const res = await db.execute(query);
        if(res.changes && res.changes.changes && res.changes.changes < 0) {
            new Error(`Error: execute failed`);
        }

        //tank ekleme fonksiyonu
         const query_1 = `INSERT INTO tank_table VALUES('tank-2',4,2)`
         await db.execute(query_1,false)

    } catch (e) {
        console.log(e)
    }
    }
