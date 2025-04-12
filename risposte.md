1. **Come evito il rendering su ChildCmp quando scrivo nella input ?**
   Wrapperei il component <ChildCmp /> dentro useMemo, mettendo come dipendenze nell'array solo le singole prop che passo a ChildCmp (in questo caso escludendo lo state dall'array di dependencies, al cambio di esso non viene ri-renderizzato ChildCmp).

2. **LOGS**
   Definiamo con X il numero di LOG massimi che vogliamo caricare alla volta.
   Al mount del componente facciamo una chiamata per recuperare i LOG, l'endpoint mi deve restituire i primi X risultati, e farmi sapere se ci sono altri risultati dopo questi.
   A FrontEnd mi calcolo in JS quanta altezza prendono X elementi, quando arrivo ad una certa distanza di scroll in basso prima di arrivare all'altezza scrollata, se il servizio mi indica che ci sono altri elementi da visualizzare, faccio partire una seconda chiamata allo stesso endpoint. Per motivi di performance gestisco un debounce e una booleana che mi dice se il servizio è già in loading (lo farei con RTK Query o libreria simile) in modo da evitare troppe chiamate o chiamate inutili. In caso di stato di loading del servizio mostro a FE uno spinner in basso al container nel quale c'è lo scroll.
   Per fare capire al BE quale gruppo di LOG voglio recuperare userei un sistema di paginazione.
   Posso applicare la stessa tecnica anche scrollando verso l'alto.

3. **DATA TABLE**
   Non sono Backendista ma seguirei un pattern CRUD, quindi farei

   - un servizio per fare la GET di tutti i customer
   - uno per fare l'UPDATE di un singolo customer basandosi sull'uuid
   - uno per fare la DELETE di N customers prendendo in input un array di uuid, nel caso di un solo elemento farei una sola DELETE
   - uno per fare il POST / creazione di un singolo customer, prendendo in input i dati del form

     A FE gestirei i servizi con RTK query in modo che possa gestire re-render automatico dei componenti al cambio di status del servizio (isLoading, isSuccess, isError) e gestione di feedback visivi all'utente (loaders, banner di errore, ecc.), caching delle response e invalidazione al richiamo di servizi che modificano o distruggono.

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
