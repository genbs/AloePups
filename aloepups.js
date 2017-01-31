((window, document) => {

    /**
     * AloePups
     * autore:          Gennaro Bosone < gennaro.bs@gmail.com >
     * data creazione:  31-01-2017
     *
     * Interfaccia al Framework SASS AloePups
     */
    class AloePups
    {

        /**
         * Caricamento delle configurazioni dall'elemento #__aloepups
         */
        constructor()
        {
            let div = document.createElement( 'div' )
            div.id = '__aloepups'
            document.body.appendChild( div )

            try {
                this.configs = JSON.parse( JSON.parse( window.getComputedStyle( div ).content ) )
                this.scales = this.configs.scales
                this.palette = this.configs.palette
            } catch (e) {
                console.error('[AloePups]\tImpossibile caricare i settaggi.');
            }

            div.remove();
        }

        /**
         * Ritorna l'unità di misura del argomento
         */
        getUnit(value)
        {
            return typeof value !== 'number'
                        ? value.replace( parseFloat( value ), '' )
                        : ''
        }

        /**
         * Modular scale
         * @param { Number } Il numero di incrementi del valore di base
         * @param { Number, Optional } valore di base
         * @param { Number, Optional } incremento del valore di base
         */
        scale(increment, value, ratio)
        {
            value = parseFloat( value || this.scales.base )
            ratio = parseFloat( ratio || this.scales.ratios[ this.scales.ratio ] )

            for ( let i = increment; i > 0; i-- )
                value = increment > 0 ? value * ratio : value / ratio

            return value + this.getUnit(value)
        }
    }

    //////////////////////////////

    document
        .addEventListener(
            'DOMContentLoaded', () => window.aloepups = new AloePups()
        )

    //////////////////////////////

}( window, document ))