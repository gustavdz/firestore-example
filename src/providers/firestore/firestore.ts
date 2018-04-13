import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Song } from '../../models/song.interface';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {

  constructor(public firestore: AngularFirestore) {
    console.log('Hello FirestoreProvider Provider');
  }

    createSong(
        albumName: string,
        artistName: string,
        songDescription: string,
        songName: string
    ): Promise<void> {
        const id = this.firestore.createId();
        return this.firestore.doc(`songList/${id}`).set({
            id,
            albumName,
            artistName,
            songDescription,
            songName,
        });
    }

    getSongList(): AngularFirestoreCollection<Song> {
        return this.firestore.collection(`songList`);
    }

}
