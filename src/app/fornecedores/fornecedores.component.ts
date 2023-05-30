import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {
  suppliers: Supplier[] = [];
  formGroupSupplier: FormGroup;
  isEditing: boolean = false;

  constructor(private SupplierService: SupplierService, formBuilder: FormBuilder){
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: [''],
      active: [''],
      category: [''],
      contact: ['']
    })
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(){
    this.SupplierService.getSuppliers().subscribe({
      next: data => this.suppliers = data,
      error: (msg) => console.log("Erro ao chamar o endpoint" + msg)
    })
  }

  save(){

  }

  remove(){

  }

  edit(){

  }
}
