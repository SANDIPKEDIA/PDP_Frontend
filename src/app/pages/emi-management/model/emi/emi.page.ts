import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from "@angular/forms";
import { EMIManagementService } from '../../../../providers/emi-management.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-emi",
  templateUrl: "./emi.page.html",
  styleUrls: ["./emi.page.scss"],
})
export class EMIPageModel implements OnInit {
  
  emiForm: FormGroup;
  public isEditMode: boolean = false;
  public data:any;
  public responseStr: string;
  
  constructor(
    public modalController: ModalController,
    public toast:ToastController,
    private _formBuilder: FormBuilder,
    private _emiManagementService:EMIManagementService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initEmiForm();
    if(undefined != this.data){
      this.emiForm.patchValue(this.data);
      this.emiForm.get('id').setValue(this.data._id);
      this.emiForm.get('lastdate').setValue(this.data.lastdate.slice(0,10));
    }

  }
  
  async closeModal() {
    const onClosedData: string = "Address Added";
    await this.modalController.dismiss(onClosedData);
  }

  updateEmi(payload) {
    let formData = JSON.parse(JSON.stringify(payload.value));
    let id = this.emiForm.get("id").value;
    formData["lastdate"] = this.dateFormater(formData.lastdate); 
    this._emiManagementService.updateEmi(id, formData).subscribe(async (resp) => {
      this.responseStr = resp.response;
      let toast = await this.toast.create({
        message:"Updated Successfully",
        color:'success',
        duration:2000
      })
      toast.present();
      this.emiForm.reset();
      this.closeModal();
    });
    this.isEditMode = false;
  }

  initEmiForm() {
    this.emiForm = this._formBuilder.group({
      loan_name: new FormControl('', Validators.compose([Validators.required])),
      userId: new FormControl(''),
      emi_ammount: new FormControl('', Validators.compose([Validators.required])),
      tenureIn_months: new FormControl('', Validators.compose([Validators.required])),
      loan_ammount: new FormControl('', Validators.compose([Validators.required])), 
      lastdate: new FormControl('', Validators.compose([Validators.required])), 
      percentage: new FormControl('', Validators.compose([Validators.required])), 
      description: new FormControl('', Validators.compose([Validators.required])), 
      id: new FormControl(""),
    });
  }

  createEmi(payload: FormGroup) {
    let formData = JSON.parse(JSON.stringify(payload.value));
    formData["userId"] = localStorage.getItem("adminId");
    formData["lastdate"] = this.dateFormater(formData.lastdate); 
    this._emiManagementService.createEmi(formData).subscribe(async (resp) => {
      this.responseStr = resp.response;
      let toast = await this.toast.create({
        message:"created Successfully",
        color:'success',
        duration:2000
      })
      toast.present();
      this.emiForm.reset();
      this.closeModal();
    });
  }

  dateFormater(inputDate) {
    let tempDate = new Date(inputDate);
    let date = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let month = (tempDate.getMonth() + 1) ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
    let year = tempDate.getFullYear();
    return isNaN(tempDate.getTime()) ? "" : month + '-' + date + '-' + year; 
  }

}
