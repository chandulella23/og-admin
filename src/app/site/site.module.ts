import {NgModule} from '@angular/core';
import {SiteComponent} from './site.component';
import {routes} from "../config/routes/index";
import {SharedModule} from "../shared/modules/shared.module";

@NgModule({
  declarations: [
    SiteComponent,
  ],
  imports: [
    routes,
    SharedModule
  ],
  exports: [SiteComponent],
  providers: []
})
export class SiteModule {
}
