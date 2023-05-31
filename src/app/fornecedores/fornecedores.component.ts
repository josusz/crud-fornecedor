import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier';
import { FormBuilder, FormGroup} from '@angular/forms';
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
  active: boolean = true;
  selectedCategory: string = 'Regional';

  constructor(private SupplierService: SupplierService, formBuilder: FormBuilder){
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: [''],
      active: ['true'], 
      category: ['Regional'],
      contact: ['']
    })
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(){
    this.SupplierService.getSuppliers().subscribe({
      next: data => this.suppliers = data,
      error: (msg) => console.log("Erro ao chamar o ENDPOINT..." + msg)
    });
  }

  save(){
    if(this.isEditing){
      this.SupplierService.update(this.formGroupSupplier.value).subscribe({
        next: () => {this.loadSuppliers();
          this.formGroupSupplier.reset();
          this.isEditing = false;
        }
      });
    }
    else{
      this.SupplierService.save(this.formGroupSupplier.value).subscribe({
        next: data => {
          this.suppliers.push(data);
          this.formGroupSupplier.reset();
        }
      });
    }
  }

  remove(supplier: Supplier): void{
    this.SupplierService.remove(supplier).subscribe({
      next: () => this.loadSuppliers()
    });
  }

  edit(supplier: Supplier): void{
    this.formGroupSupplier.setValue(supplier);
    this.isEditing = true;
  }
}