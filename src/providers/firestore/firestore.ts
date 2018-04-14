import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Song } from '../../models/song.interface';
import {AuthProvider} from "../auth/auth";

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {

  constructor(public firestore: AngularFirestore, public authData: AuthProvider ) {
    console.log('Hello FirestoreProvider Provider');
  }

    createSong(
        albumName: string,
        artistName: string,
        songDescription: string,
        songName: string
    ): Promise<void> {
        const uid = this.authData.myuser();
        const id = this.firestore.createId();
        return this.firestore.doc(`/songList/users/${uid}/${id}`).set({
            id,
            albumName,
            artistName,
            songDescription,
            songName,
        });
    }

    getSongList(): AngularFirestoreCollection<Song> {
        const uid = this.authData.myuser();
        return this.firestore.collection(`songList/users/${uid}`);
    }

    deleteSong(songId: string): Promise<void> {
        const uid = this.authData.myuser();
        return this.firestore.doc(`songList/users/${uid}/${songId}`).delete();
    }

}
