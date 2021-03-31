import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { ViewChild } from '@angular/core'
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';







@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.scss'],

})



export class ListeClientComponent implements OnInit {
  clt: Client[] = []
  c: Client[] = []
  //sets
  CatTarif: SelectItem[] = [];
  Com: SelectItem[] = [];
  Reg: SelectItem[] = [];
  //selected data
  selectedCat: Client
  selectedCom: string[] = [];
  selectedReg: string[] = [];
  selectedPort = "";

  //
  auxClt: Client[] = []


  //Get access to the datatable
  @ViewChild('dt1') dataTable: Table;
  @ViewChild('dpcat') DDcat: Dropdown;
  @ViewChild('dpcom') DDcom: Dropdown;
  @ViewChild('dpreg') DDreg: Dropdown;


  //Boolean variables to check fields entrance
  enterCat: boolean = false
  enterCom: boolean = false
  enterReg: boolean = false
  cptCat = 0
  cptCom = 0
  cptReg = 0


  constructor(private ser: ClientService) { }

  ngOnInit(): void {

    this.ser.getAllClients().subscribe(
      res => {
        this.clt = res
        let cat = [... new Set(this.clt.map(obj => obj.Categorie_Tarifaire))]
        let com = [...new Set(this.clt.map(item => item.Nom_Commercial))].filter(elem => elem != null)
        let reg = [... new Set(this.clt.map(obj => obj.Region))].filter(elem => elem != null)
        for (let c of cat) {
          let x: SelectItem = { label: c, value: c }
          this.CatTarif.push(x)
        }
        for (let c of com) {
          let x: SelectItem = { label: c, value: c }
          this.Com.push(x)
        }
        for (let r of reg) {
          let x: SelectItem = { label: r, value: r }
          this.Reg.push(x)
        }
        console.log(this.Reg.length)
      },
      err => console.log(err)
    )
    
  }

  clear(table: Table) {
    table.clear();
    this.CatTarif = []
    this.Com = []
    this.Reg = []
    let cat = [... new Set(this.clt.map(obj => obj.Categorie_Tarifaire))]
    let com = [...new Set(this.clt.map(item => item.Nom_Commercial))].filter(elem => elem != null)
    let reg = [... new Set(this.clt.map(obj => obj.Region))].filter(elem => elem != '')
    for (let c of cat) {
      let x: SelectItem = { label: c, value: c }
      this.CatTarif.push(x)
    }
    for (let c of com) {
      let x: SelectItem = { label: c, value: c }
      this.Com.push(x)
    }
    for (let r of reg) {
      let x: SelectItem = { label: r, value: r }
      this.Reg.push(x)
    }
  }

  GetSelectedCat() {
  
    //rien n'est selectionné
    if (this.DDcat.value == null && this.DDcom.value == null && this.DDreg.value == null) {
      console.log("1")
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      let cat = [... new Set(this.dataTable.value.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.value.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.value.map(obj => obj.Region))].filter(elem => elem != '')
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }

    }
    // je sélectionne une cat
    if (this.DDcat.value != null) {
      console.log("2")
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      let cat = [... new Set(this.dataTable.filteredValue.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.filteredValue.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.filteredValue.map(obj => obj.Region))].filter(elem => elem != '')
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }
    }
    else {
      //quand je déselectionne
      console.log("3")
      let cat = [... new Set(this.dataTable.filteredValue.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.filteredValue.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.filteredValue.map(obj => obj.Region))].filter(elem => elem != '' )
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }
    }
    
  }

  GetSelectedCom() {
    //rien n'est selectionné
    if (this.DDcat.value == null && this.DDcom.value == null && this.DDreg.value == null) {
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      let cat = [... new Set(this.dataTable.value.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.value.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.value.map(obj => obj.Region))].filter(elem => elem != '')
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }

    }
    // je sélectionne une cat
    if (this.DDcom.value != null) {
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      let cat = [... new Set(this.dataTable.filteredValue.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.filteredValue.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.filteredValue.map(obj => obj.Region))].filter(elem => elem != '')
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }
    }
    else {
      let cat = [... new Set(this.dataTable.filteredValue.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.filteredValue.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.filteredValue.map(obj => obj.Region))].filter(elem => elem != '')
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }
    }
  }


  GetSelectedReg() {
    //rien n'est selectionné
    if (this.DDcat.value == null && this.DDcom.value == null && this.DDreg.value == null) {
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      let cat = [... new Set(this.dataTable.value.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.value.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.value.map(obj => obj.Region))].filter(elem => elem != '')
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }

    }
    // je sélectionne une cat
    if (this.DDreg.value != null) {
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      let cat = [... new Set(this.dataTable.filteredValue.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.filteredValue.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.filteredValue.map(obj => obj.Region))].filter(elem => elem != '')
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }
    }
    else {
      let cat = [... new Set(this.dataTable.filteredValue.map(obj => obj.Categorie_Tarifaire))]
      let com = [...new Set(this.dataTable.filteredValue.map(item => item.Nom_Commercial))].filter(elem => elem != null)
      let reg = [... new Set(this.dataTable.filteredValue.map(obj => obj.Region))].filter(elem => elem != '')
      this.CatTarif = []
      this.Com = []
      this.Reg = []
      for (let c of cat) {
        let x: SelectItem = { label: c, value: c }
        this.CatTarif.push(x)
      }
      for (let c of com) {
        let x: SelectItem = { label: c, value: c }
        this.Com.push(x)
      }
      for (let r of reg) {
        let x: SelectItem = { label: r, value: r }
        this.Reg.push(x)
      }
    }
  }

}
