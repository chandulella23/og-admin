import { PremadeLayoutManager } from './../../../shared/classes/premade-layout-manager';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../../shared/services/admin.service';
import { PlanService } from './../../../shared/services/plan.service';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
declare var jQuery:any;
declare var window:any;
declare var bootbox: any;
@Component({
  selector: 'premade-calcs',
  templateUrl: './premade-calcs.component.html',
  styleUrls: ['./premade-calcs.component.css']
  // encapsulation:ViewEncapsulation.Emulated
})
export class PremadeCalcsComponent extends PremadeLayoutManager implements OnInit {
  @Input() data:any;
  loading:Boolean=true;
  premades_calcs:any=[];
  templates=[];
  availableTemplates=[];
  constructor(private planService:PlanService,
    private adminService:AdminService) { 
      super();
    }

  ngOnInit() { }
  ngOnChanges(changes:SimpleChanges){ 
    if(this.data && this.data.plan) { 
      this.data = JSON.parse(JSON.stringify(this.data));
      this.getPlanPremades(this.data.plan._id);
    }
  }
  getPlanPremades(planId){
    this.loading=true;
    this.planService.getPlanPremades(planId).subscribe((data)=>{
      this.loading=false;
      this.premades_calcs=data;
      this.availableTemplates = this.getAvailableTemplates(this.data);
      if(this.availableTemplates.length>0){
        this.syncCheckBoxes(this.availableTemplates,this.premades_calcs);
      }
    });
  }
  
  updateCalcs(){
    this.planService.updatePlanPremades({data:this.premades_calcs}).subscribe((data)=>{
      window.toastNotification('Premade Cals Updated');
      this.getPlanPremades(this.data.plan._id);
    })
  }
  getAvailableTemplates(data){
    if(data.features){
      let item = this.data.features.find(obj => (obj.feature._id == 'templates'));
      return (item.sub_features || []);
    }
    return [];
  }
}
