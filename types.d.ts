export interface ParsedStyleSheet {
    type:       string;
    stylesheet: Stylesheet;
}

export interface Stylesheet {
    rules:         Rule[];
    parsingErrors: any[];
}

export interface Rule {
    type:          PurpleType;
    selectors?:    string[];
    declarations?: Declaration[];
    position:      Position;
    name?:         string;
    vendor?:       Vendor;
    keyframes?:    Keyframe[];
    media?:        string;
    rules?:        Keyframe[];
    comment?:      string;
    supports?:     string;
}

export interface Declaration {
    type:     DeclarationType;
    property: string;
    value:    string;
    position: Position;
}

export interface Position {
    start: End;
    end:   End;
}

export interface End {
    line:   number;
    column: number;
}

export enum DeclarationType {
    Declaration = "declaration",
}

export interface Keyframe {
    type:         KeyframeType;
    values?:      Value[];
    declarations: Declaration[];
    position:     Position;
    selectors?:   string[];
}

export enum KeyframeType {
    Keyframe = "keyframe",
    Rule = "rule",
}

export enum Value {
    The0 = "0%",
    The50 = "50%",
    To = "to",
}

export enum PurpleType {
    Comment = "comment",
    FontFace = "font-face",
    Keyframes = "keyframes",
    Media = "media",
    Rule = "rule",
    Supports = "supports",
}

export enum Vendor {
    Webkit = "-webkit-",
}
