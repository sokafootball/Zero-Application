1. **Come evito il rendering su ChildCmp quando scrivo nella input ?**
   Wrapperei il component <ChildCmp /> dentro useMemo, mettendo come dipendenze nell'array solo le singole prop che passo a ChildCmp (in questo caso escludendo lo state dall'array di dependencies, al cambio di esso non viene ri-renderizzato ChildCmp).

2. **LOGS**
   Definiamo con X il numero di LOG massimi che vogliamo caricare alla volta.
   Al mount del componente facciamo una chiamata per recuperare i LOG, l'endpoint mi deve restituire i primi X risultati, e farmi sapere se ci sono altri risultati dopo questi.
   A FrontEnd mi calcolo in JS quanta altezza prendono X elementi, quando arrivo ad una certa distanza di scroll in basso prima di arrivare all'altezza scrollata, se il servizio mi indica che ci sono altri elementi da visualizzare, faccio partire una seconda chiamata allo stesso endpoint. Per motivi di performance gestisco un debounce e una booleana che mi dice se il servizio è già in loading (lo farei con RTK Query o libreria simile) in modo da evitare rispettivamente troppe chiamate o chiamate inutili. In caso di stato di loading del servizio mostro a FE uno spinner in basso al container nel quale c'è lo scroll.
   Per fare capire al BE quale gruppo di LOG voglio recuperare userei un sistema di paginazione. Con RTK Query o libreria simile gestirei anche il cache delle response in modo da rendere più performante lo scrolling verso pagine di contenuti già esplorate.
   Posso applicare la stessa tecnica anche scrollando verso l'alto.

3. **DATA TABLE**
   A FE gestirei i servizi con RTK query in modo che possa gestire re-render automatico dei componenti al cambio di status del servizio (isLoading, isSuccess, isError) e gestione di feedback visivi all'utente (loaders, banner di errore, ecc.), caching delle response e invalidazione al richiamo di servizi che modificano o distruggono.
   In linea di massima farei una GET al rendering del componente, che verrebbe intercettata da un controllo sulla cache. In questo modo se la cache è stata invalidata a seguito di un edit/add/delete di customer ho immediatamente i dati freschi, se niente è cambiato e la cache non è stata invalidata non partirebbe comunque nessuna chiamata.
   Le varie chiamate di edit/add/delete invece le triggererei al click sul pulsante di conferma flusso (pulsante DELETE in caso di cancellazione customer, pulsante in fondo al form nel caso di EDIT / ADD) e rimarrei in ascolto di esito positivo prima di invalidare la cache. Nel caso ci fosse un esito negativo non invaliderei niente e mostrerei un banner di errore all'utente.
   Il trigger manuale nel caso di RTK Query si fa tramite un hook autogenerato dalla libreria che è di tipo Lazy (la differenza rispetta alla GET è che questa viene fatta ad ogni re-render e non triggerata a mano.).
   Se per logiche di business esterne allo scope dell'esercizio ci fossero dei dati richiesti in input per fare le chiamate, gestirei lo skip delle chiamate stesse in caso di mancanza di questi dati.
4. BUFFER

   ```
   class Buffer<T> {
        private buffer: T[] = [];

        get(): T | undefined {
            if (this.buffer.length > 0) {
                return this.buffer.shift()
            }
            return undefined;
        }

        add(item: T): void {
            this.buffer.push(item);
        }

        remove(item: T): boolean {
            onst index = this.buffer.indexOf(item);
            if (index !== -1) {
                this.buffer.splice(index, 1);
                return true;
            }
            return false;
        }
    }
   ```
