import {GameObject} from '@eva/eva.js';
import {Sound} from '@eva/plugin-sound';

export default function createBgSound(){
    const bgSound = new GameObject('sound');

    bgSound.addComponent(
        new Sound({resource:'bgSound', loop:true,autoplay:true, volumn:0.5})
    );

    return bgSound;
}