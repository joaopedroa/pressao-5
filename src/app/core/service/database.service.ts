import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { DatePipe } from '@angular/common';
import { Dados } from 'src/app/model/Dados';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db:SQLiteObject;
  databaseName:string = 'dados.db';

  constructor(private storage: Storage, private datepipe: DatePipe, private sqLite:SQLite, private sqLitePorter:SQLitePorter) { }

  /*
  async openDatabase(){
    try {
      this.db = await this.sqLite.create({name: this.databaseName, location: 'default'});
      await this.createDatabase();
    } catch (error) {
      console.log("Ocorreu um erro ao criar o banco de dados", error)
    }
  }

  async createDatabase(){
    const sqlCreateDatabase = this.getCreateDatabase();
    const result = await this.sqLitePorter.importSqlToDb(this.db,sqlCreateDatabase);
    return result ? true : false;
  }

  getCreateDatabase(){
    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS dados (id integer primary key AUTOINCREMENT, data TEXT, diastolica TEXT, sistolica TEXT, pulso TEXT, posicao TEXT);');
    return sqls.join('\n');
  }

  executeSql(sql:string, params?:any[]){
    return this.db.executeSql(sql, params);
  }
  */

 public insert(dado: Dados) {
  let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
  return this.save(key, dado);
}

public update(key: string, dado: Dados) {
  return this.save(key, dado);
}

private save(key: string, dado: Dados) {
  return this.storage.set(key, dado);
}

public remove(key: string) {
  return this.storage.remove(key);
}

public getAll() {

  let dados = [];

  return this.storage.forEach((value: Dados, key: string, iterationNumber: Number) => {
    let dado = {
      key : key,
      value : value
    }
    dados.push(dado);
  })
    .then(() => {
      console.log('testeteste',dados);
      return Promise.resolve(dados);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}


}
