let config = {
    types: [
        'tab',
        'identifier',
        'keyword',
        'string',
        'number',
        'operator',
        'libfunc'
    ],
    styles: {
        tab: {
            'background-color': 'transparent',
            'width': '30px',
            'align-self': 'stretch',
        },
        keyword: {
            'background-color': '#4B69C6',
        },
        identifier: {
            'background-color': '#7A3E9D',
        },
        string: {
            'background-color': '#448C27',
        },
        number: {
            'background-color': '#B35D27',
        },
        operator: {
            'background-color': '#777777',
            'border': '2px solid black',
        },
        libfunc: {
            'background-color': '#AA3731',
        }
    },
    type2styles : {
        tab: ['tab'],
        keyword: ['keyword'],
        identifier: ['identifier'],
        string: ['string'],
        number: ['number'],
        operator: ['operator'],
        libfunc: ['libfunc']
    },
    code : [
        [
            {
                text: 'count',
                type: 'identifier'
            },
            {
                text: '=',
                type: 'operator'
            },
            {
                text: '1',
                type: 'number'
            }
        ],
        [
            {
                text: 'while',
                type: 'keyword'
            },
            [
                {
                    text: 'count',
                    type: 'identifier'
                },
                {
                    text: '<',
                    type: 'operator'
                },
                {
                    text: '3',
                    type: 'number'
                }
            ]
        ],
        [
            {
                text: 'Print',
                type: 'libfunc'
            },
            {
                text: '"hello world"',
                type: 'string'
            },
        ],
        [
            {
                text: 'count',
                type: 'identifier'
            },
            {
                text: '=',
                type: 'operator'
            },
            [
                {
                    text: 'count',
                    type: 'identifier'
                },
                {
                    text: '+',
                    type: 'operator'
                },
                {
                    text: '1',
                    type: 'number'
                },
            ]
        ],
        [
            {
                text: 'End While',
                type: 'keyword'
            },
        ]
    ]
}