import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from "@angular/forms";
import { DayManagementService } from '../../../../providers/day-management.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-task",
  templateUrl: "./task.page.html",
  styleUrls: ["./task.page.scss"],
})
export class TaskPageModel implements OnInit {
  
  taskForm: FormGroup;
  public isEditMode: boolean = false;
  public data:any;
  public responseStr: string;
  
  constructor(
    public modalController: ModalController,
    public toast:ToastController,
    private _formBuilder: FormBuilder,
    private _dayManagementService:DayManagementService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initTaskForm();
   if(this.data){
    this.taskForm.patchValue(this.data);
    this.taskForm.get('id').setValue(this.data._id);
    this.taskForm.get('date').setValue(this.data.date.slice(0,10));
   }
  }
  
  async closeModal(isCreated: boolean) {
    await this.modalController.dismiss(isCreated);
  }

  updateTask(payload) {
    let formData = JSON.parse(JSON.stringify(payload.value));
    let id = this.taskForm.get("id").value;
    this._dayManagementService.updateTask(id, formData).subscribe(async (resp) => {
      this.responseStr = resp.response;
      if(!resp.error){
        let toast = await this.toast.create({
          message:"Updated Successfully",
          color:'success',
          duration:2000
        })
        toast.present();
        this.closeModal(true);
      } else {
        this.closeModal(false);
      }
      this.taskForm.reset();
    });
    this.isEditMode = false;
  }

  initTaskForm() {
    this.taskForm = this._formBuilder.group({
      task_name: new FormControl('', Validators.compose([Validators.required])),
      userId: new FormControl(),
      incompleted_task: new FormControl(''),
      priority: new FormControl('', Validators.compose([Validators.required])),
      date: new FormControl('', Validators.compose([Validators.required])), 
      id: new FormControl(""),
    });
  }

  createTask(payload: FormGroup) {
    let formData = JSON.parse(JSON.stringify(payload.value));
    formData["userId"] = localStorage.getItem("adminId");
    formData["incompleted_task"] = "NO";
    this._dayManagementService.createTask(formData).subscribe(async (resp) => {
      this.responseStr = resp.response;
      if(!resp.error){
        let toast = await this.toast.create({
          message:"created Successfully",
          color:'success',
          duration:2000
        })
        toast.present();
        this.closeModal(true);
      } else {
        this.closeModal(false);
      }
      this.taskForm.reset();
    });
  }

}
