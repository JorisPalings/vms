import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    private strings: string[] = [];

    constructor(){
        this.populateStrings();
    }

    populateStrings() {
        this.strings.push("Prototyping...");
        this.strings.push("Breaking hardware...");
        this.strings.push("Debugging...");
        this.strings.push("Passing Turing test...");
        this.strings.push("Compiling...");
        this.strings.push("Launching missile...");
        this.strings.push("Teaching Pepper...");
        this.strings.push("Stopping robot apocalypse...");
        this.strings.push("Building data trees...");
        this.strings.push("Initializing robotic click-path AI...");
        this.strings.push("Perturbing matrices...");
    }

    getRandomStrings(): string[] {
        shuffle(this.strings);
        return this.strings;
    }
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
