import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonProgressBar,
  IonFab,
  IonFabButton,
  IonIcon,
  LoadingController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Pokemon } from '../../services/pokemon';
import { IPokemon } from '../../models/pokemon.model';
import { GetStatPipe } from '../../pipes/get-stat-pipe';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonText,
    IonProgressBar,
    IonFab,
    IonFabButton,
    IonIcon,
    GetStatPipe,
  ],
})
export class DetailPokemonPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(Pokemon);
  private loadingController = inject(LoadingController);

  public pokemon = signal<IPokemon | null>(null);

  constructor() {
    addIcons({ close });
  }

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Cargando detalle...',
      });
      await loading.present();

      this.pokemonService
        .getPokemon(Number(id))
        .then((data: IPokemon) => {
          this.pokemon.set(data);
        })
        .catch((error) => {
          console.error('Error al obtener el detalle:', error);
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  goBack() {
    this.router.navigate(['list-pokemon']);
  }
}