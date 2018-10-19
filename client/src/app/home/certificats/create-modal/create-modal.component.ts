import { LoadingService } from './../../../core/loading/loading.service';
import { CertificatesService } from './../../../core/certificates/certificates.service';
import { CreateCertificateModel } from './../../../core/certificates/certificate-data.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent{
  public createCertificateModel: CreateCertificateModel = new CreateCertificateModel();
  @ViewChild('createForm') form: NgForm;

  constructor(private certificatesService: CertificatesService, private loading: LoadingService){
  }

  public submit(): void{
    if(this.form.valid) {
      this.createCertificateModel.validity = 360;
      this.createCertificateModel.serial = 'ZZZ';
      this.createCertificateModel.commonName = `${this.createCertificateModel.name}_${this.createCertificateModel.surname}`
      this.loading.show();
      this.certificatesService.create(this.createCertificateModel).subscribe(() => {
        this.loading.hide();
      })
    }
  }

}
