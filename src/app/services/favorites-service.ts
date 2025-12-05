import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { AuthService } from '../core/services/firebase/auth.service';
import { Favorite } from '../lib/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private firestore: Firestore = inject(Firestore);
  private authService = inject(AuthService);

  favorites = signal<Favorite[]>([]);
  loading = signal(false);

  addFavorite(nombre: string, image: string, customName?: string): Observable<any> {
    const user = this.authService.currentUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const favorite: Omit<Favorite, 'id'> = {
      nombre,
      customName: customName || nombre,
      image,
      userId: user.uid,
      createdAt: new Date()
    };

    const favoritesCollection = collection(this.firestore, 'favorites');
    return from(
      addDoc(favoritesCollection, {
        ...favorite,
        createdAt: Timestamp.fromDate(favorite.createdAt)
      })
    );
  }

  getFavorites(): Observable<Favorite[]> {
    const user = this.authService.currentUser();
    if (!user) {
      this.favorites.set([]);
      return from([[]]);
    }

    this.loading.set(true);
    const favoritesCollection = collection(this.firestore, 'favorites');
    const q = query(favoritesCollection, where('userId', '==', user.uid));

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        const items = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as any;
          return {
            id: docSnap.id,
            ...data,
            createdAt: data['createdAt']?.toDate
              ? data['createdAt'].toDate()
              : new Date()
          } as Favorite;
        });

        this.favorites.set(items);
        this.loading.set(false);
        return items;
      })
    );
  }

  updateFavorite(id: string, customName: string): Observable<void> {
    const favoriteDoc = doc(this.firestore, 'favorites', id);
    return from(updateDoc(favoriteDoc, { customName }));
  }

  deleteFavorite(id: string): Observable<void> {
    const favoriteDoc = doc(this.firestore, 'favorites', id);
    return from(deleteDoc(favoriteDoc));
  }

  isFavorite(name: string): boolean {
    return this.favorites().some((fav) => fav.nombre === name);
  }
}
