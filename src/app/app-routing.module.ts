import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'dados',
    loadChildren: () => import('./modal/dados/dados.module').then( m => m.DadosPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'informacao',
    loadChildren: () => import('./modal/informacao/informacao.module').then( m => m.InformacaoPageModule)
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
