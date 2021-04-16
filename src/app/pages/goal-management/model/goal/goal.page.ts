import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { GoalManagementService } from '../../../../providers/goal-management.service';

@Component({
  selector: "app-goal",
  templateUrl: "./goal.page.html",
  styleUrls: ["./goal.page.scss"],
})
export class GoalPageModel implements OnInit {
  
  goalForm: FormGroup;
  public isEditMode: boolean = false;
  public data:any;
  public responseStr: string;
  
  constructor(
    public modalController: ModalController,
    public toast:ToastController,
    private _formBuilder: FormBuilder,
    private _goalManagementService:GoalManagementService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // debugger
    this.initGoalForm();
    if(this.data != undefined){
      this.goalForm.patchValue(this.data);
      this.goalForm.get('id').setValue(this.data._id);
      this.goalForm.get('type').setValue(this.data.type);
      this.goalForm.get('expectedCompleteddate').setValue(this.data.expectedCompleteddate.slice(0,10));
    }
  }
  
  async closeModal() {
    const onClosedData: string = "Address Added";
    await this.modalController.dismiss(onClosedData);
  }

  updateGoal(payload) {
    let formData = JSON.parse(JSON.stringify(payload.value));
    let id = this.goalForm.get("id").value;
    this._goalManagementService.updateGoal(id, formData).subscribe(async (resp) => {
      this.responseStr = resp.response;
      let toast = await this.toast.create({
        message:"Updated Successfully",
        color:'success',
        duration:2000
      })
      toast.present();
      this.goalForm.reset();
      this.closeModal();
    });
    this.isEditMode = false;
  }

  initGoalForm() {
    this.goalForm = this._formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      userId: new FormControl(),
      type: new FormControl('', Validators.compose([Validators.required])),
      expectedCompleteddate: new FormControl('', Validators.compose([Validators.required])),
      completeddate: new FormControl(), 
      description: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl(""),
    });
  }

  dateFormater(inputDate) {
    let tempDate = new Date(inputDate);
    let date = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let month = (tempDate.getMonth() + 1) ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
    let year = tempDate.getFullYear();
    return isNaN(tempDate.getTime()) ? "" : month + '-' + date + '-' + year; 
  }

  createGoal(payload: FormGroup) {
    let formData = JSON.parse(JSON.stringify(payload.value));
    formData["userId"] = localStorage.getItem("adminId");
    formData["expectedCompleteddate"] = this.dateFormater(formData.expectedCompleteddate); 
    formData["completeddate"] = this.dateFormater(formData.completeddate); 
    this._goalManagementService.createGoal(formData).subscribe(async (resp) => {
      this.responseStr = resp.response;
      let toast = await this.toast.create({
        message:"created Successfully",
        color:'success',
        duration:2000
      })
      toast.present();
      this.goalForm.reset();
      this.closeModal();
    });
  }

}
