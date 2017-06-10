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
        let div = this.getAloePupsElement()

        try {
            let content = window.getComputedStyle( div ).content;
            Object.assign(this, this.parse(content))
            this.sanitize()
        } catch (e) {
            console.error('[AloePups]\tImpossibile caricare i settaggi.');
        }

        div.remove();

        window.addEventListener('resize', e => { 
            
        }, { passive: true })

        this.onResize()
    }

    /**
     * Parse JSON from #__aloepups content
     *
     * @param {String} content
     */
    parse(content)
    {
        content = content.replace(/[\\]/g, '')

        content = content.substr(1).substr(0, content.length - 2).replace(/[\']/g, '"')

        return JSON.parse(content)
    }

    /**
     * Crea l'elemento con i settaggi in fromato JSON nell'attrivuto content
     */
    getAloePupsElement()
    {
        let div = document.createElement( 'div' )
        div.id = '__aloepups'
        document.body.appendChild( div )

        return div
    }

    /**
     * 
     */
    onResize()
    {
        this.HTMLFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
    }

    /**
     * Return window heigth
     */
    getWindowHeight()
    {
        return this.windowWidth
    }

    /**
     * Return window width
     */
    getWindowHeight()
    {
        return this.windowWidth
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
     * Get modular scale ratio
     * 
     * @return float
     */
    ratio()
    {
        return this.scales.ratios[this.scales.ratio]
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
        ratio = parseFloat( ratio || this.ratio() )

        for ( let i = Math.abs(increment); i > 0; i-- )
            value = increment > 0 ? value * ratio : value / ratio

        return value + this.getUnit(value)
    }

    /**
     * Ritorna una velocità settata in pupsConfig
     *
     * @param {String} s
     * @returns int
     */
    speed(s)
    {
        return this.animation.speeds[s ? s : this.animation.base_speed]
    }

    /**
     * Ritorna un valore
     *
     * @param {String} s
     * @returns int
     */
    spacing(s)
    {
        return this.spacings.sizes[s]
    }

    /**
     * @param {String} value
     * @return float
     */
    remToPX(value)
    {
        const unit = this.getUnit(value)

        switch (unit) {
            case 'em': 
            case 'rem': 
                return parseFloat(value) * this.HTMLFontSize
            case 'px': 
                return parseFloat(value)
        }
    }

    /**
     * @param {String} value
     * @return float
     */
    pxToREM(value)
    {
        const unit = this.getUnit(value)

        switch (unit) {
            case 'em': 
            case 'rem': 
                return parseFloat(value)
            case 'px': 
                return parseFloat(value) / this.HTMLFontSize
        }
    }

    /**
     * Cancella un timeout
     */
    clearDelay(d) {
        d && window.clearTimeout(d);
    }

    /**
     * Timeout function
     */
    delay(callback, speed, context)
    {
        return window.setTimeout(e => { callback.call(context) }, typeof speed == 'string' ? this.speed(speed) : speed)
    }

    /**
     * Sanitizza l'oggetto configs
     */
    sanitize()
    {
        if(this.animation && this.animation.speeds)
            Object.keys(this.animation.speeds).forEach(k => {
                this.animation.speeds[k] = this.stringToMilliseconds(this.animation.speeds[k])
            })
    }

    /**
     * Converte un valore di tipo string (s, ms)
     *
     * @param {String} str
     * @return {Float} tempo
     */
    stringToMilliseconds(str)
    {
        if(str.indexOf('ms') >= 0)
            return parseFloat(str);
        else if(str.indexOf('s') >= 0)
            return parseFloat(str) * 1000;

        return parseFloat(str);
    }
}

export default new AloePups()