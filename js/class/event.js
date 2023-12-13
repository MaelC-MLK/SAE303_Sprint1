

class Event {
    #id;
    #summary;
    #description;
    #start;
    #end;
    #location;
    #groups;

    constructor(id, summary, description, start, end, location) {
        this.#id = id;
        this.#summary = summary.slice(0, summary.lastIndexOf(','));
        this.#description = description;
        this.#start = new Date(start);
        this.#end = new Date(end);
        this.#location = location.toLowerCase();

        this.#groups = summary.slice(summary.lastIndexOf(',')+1);
        this.#groups = this.#groups.split('.');
        this.#groups = this.#groups.map( gr => gr.replace(/\s/g, "") );
    }

    get id() {
        return this.#id;
    }

    get summary() {
        return this.#summary;
    }

    get description() {
        return this.#description;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get location() {
        return this.#location;
    }

    get groups() {
        return this.#groups.map( gr => gr); // retourne une copie du tableau
    }

    get type() {
        let typeAbbreviations = ['CM', 'TD', 'TP']; 
        let summaryWords = this.#summary.split(' ');
        let eventType = typeAbbreviations.find(abbreviation => summaryWords.includes(abbreviation));
        return eventType || 'Autre';
    }
    
    get enseignant() {
        let titleWords = this.#summary.toLowerCase().split(' ');
        if (titleWords.length >= 2) {
            let enseignantName = titleWords.slice(-2).join(' ');
            return enseignantName;
        } else {
            return 'Non spécifié';
        }
    }

    get ressource() {
        let titleWords = this.#summary.toLowerCase().split(' ');
        let numberOfWordsForRessource = 1;
        if (titleWords.length >= numberOfWordsForRessource) {
            let ressourceName = titleWords.slice(0, numberOfWordsForRessource).join(' ');
            return ressourceName;
        } else {
            return 'Non spécifié';
        }
    }

    // retourne un objet contenant les informations de l'événement
    // dans un format compatible avec Toast UI Calendar (voir https://nhn.github.io/tui.calendar/latest/EventObject)
    toObject() {
        return {
            id: this.#id,
            title: this.#summary,
            body: this.#description,
            start: this.#start,
            end: this.#end,
            location: this.#location ,
            groups: this.#groups,
            type: this.type,
            enseignant: this.enseignant,
            ressource: this.ressource,
        }
    }
}

export {Event};