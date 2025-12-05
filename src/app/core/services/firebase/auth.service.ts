import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { UserProfile } from '../../../lib/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore = inject(Firestore);

  // Signal that tracks the current Firebase user
  currentUser = signal<User | null>(null);

  userProfile = signal<UserProfile | null>(null);

  // AngularFire observable for auth state
  user$ = user(this.auth);

  // constructor() {
  //   this.user$.subscribe((firebaseUser) => {
  //     this.currentUser.set(firebaseUser);
  //   });
  // }

  register(email: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }


  constructor() {
    this.user$.subscribe(async (user) => {
      this.currentUser.set(user);
      if (user) {
        console.log("User")
        
        // Cargar perfil del usuario desde Firestore
        const profileDoc = await getDoc(doc(this.firestore, 'users', user.uid));
        
        console.log(profileDoc  )
        if (profileDoc.exists()) {
          this.userProfile.set(profileDoc.data() as UserProfile);
        }
      } else {
        this.userProfile.set(null);
      }
    });
  }

  hasRole(role: string): boolean {
    const profile = this.userProfile();
    return profile?.['role'] === role;
  }
}
