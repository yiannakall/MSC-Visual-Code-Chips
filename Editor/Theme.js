import { assert } from "../Utils/Assert.js";

export class ThemeableProps {
    static ValueTypes = {
        Color: 'Color',
        Number: 'Number',
        Enumerated: 'Enumerated',
    };

    static Props = {
        BackgroundColor: 'BackgroundColor',
        PaddingLeft: 'PaddingLeft',
        PaddingRight: 'PaddingRight',
        PaddingTop: 'PaddingTop',
        PaddingBottom: 'PaddingBottom',
        FontSize: 'FontSize',
        Width: 'Width',
        Height: 'Height',
        Gap: 'Gap',
        FontColor: 'FontColor'
    };

    static PropDefs = {
        BackgroundColor: {
            name: 'Background Color',
            description: 'Background Color',
            type: this.ValueTypes.Color,
        },

        PaddingLeft: {
            name: 'Left Padding',
            description: 'Padding from the left in pixels',
            type: this.ValueTypes.Number
        },
        
        PaddingRight: {
            name: 'Right Padding',
            description: 'Padding from the right in pixels',
            type: this.ValueTypes.Number
        },
        
        PaddingTop: {
            name: 'Top Padding',
            description: 'Padding from the top in pixels',
            type: this.ValueTypes.Number
        },

        PaddingBottom: {
            name: 'Bottom Padding',
            description: 'Padding from the bottom in pixels',
            type: this.ValueTypes.Number
        },

        FontSize: {
            name: 'Font Size',
            description: 'The size of the font in pixels',
            type: this.ValueTypes.Number
        },

        FontColor: {
            name: 'Font Color',
            description: 'The color of the font',
            type: this.ValueTypes.Number
        },

        Width: {
            name: 'Width',
            description: 'The horizontal size in pixels',
            type: this.ValueTypes.Number
        },

        Height: {
            name: 'Height',
            description: 'The vertical size in pixels',
            type: this.ValueTypes.Number
        },

        Gap: {
            name: 'Gap',
            description: 'The gap between contained elements in pixels',
            type: this.ValueTypes.Number
        },

    };

    static css = {
        BackgroundColor: (value) => {
            return { 'background-color': value };
        },
        PaddingLeft: (value) => {
            return { 'padding-left': value };
        },
        PaddingRight: (value) => {
            return { 'padding-right': value };
        },
        PaddingTop: (value) => {
            return { 'padding-top': value };
        },
        PaddingBottom: (value) => {
            return { 'padding-bottom': value };
        },
        FontSize: (value) => {
            return { 'font-size': value };
        },
        Width: (value) => {
            return { 'width': value };
        },
        Height: (value) => {
            return { 'height': value };
        },
        Gap: (value) => {
            return { 'gap': value };
        }
    }

    static IsValid(prop, value) {
        let exists = Object.keys(ThemeableProps.Props).includes(prop) && Object.keys(ThemeableProps.PropDefs).includes(prop);
        
        return exists && (value !== undefined || ThemeableProps.IsValidValue(prop, value));
    };

    static IsValidValue(prop, value){
        //todo check if the value is of the type that it's supposed to be
        return true;
    }

    static ToCss(prop, value){
        if (!ThemeableProps.IsValid(prop, value)){
            console.error('trying to convert non valid property-value pair into css');
            return;
        }

        return ThemeableProps.css[prop](value);
    }
}

export class Theme {
    theme;

    constructor(props){
        for (let prop in props){
            assert(ThemeableProps.IsValid(prop, props[prpo]), `Not supported themable property pair ${prop} -> ${props[prop]}`);
        }

        this.theme = props;
    }

    Set(prop, value){
        assert(ThemeableProps.IsValid(prop, props[prpo]), `Not supported themable property pair ${prop} -> ${props[prop]}`);
        this.theme[prop] = value;
    }

    Remove(prop){
        delete this.theme[prop];
    }

    GetKeys(){
        return Object.keys(this.theme);
    }

    Get(key){
        return this.theme[key];
    }

    ToCss(){
        let css = [];

        for (let prop in this.theme)
            css.push( ThemeableProps.ToCss(prop, this.theme[prop]) );
    
        css = Object.assign({}, ...css);

        return css;
    }
}

export class Themeable {
    props = [];

    constructor(...props){
        props.forEach((prop) => {
            assert(ThemeableProps.IsValid(prop), `Not supported themeable property ${prop}`);
        });

        this.props = props;
    }

    CanAccept(theme){
        return theme.GetKeys && !theme.GetKeys().some( (prop) => !this.props.includes(prop) );
    }
}