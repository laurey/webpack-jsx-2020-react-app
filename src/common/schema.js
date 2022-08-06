const schema = {
    questionPanels: [
        {
            id: 1,
            index: 3,
            visible: true,
            disabled: false,
            questionSets: [
                { questionSetId: 1, visible: true },
                { questionSetId: 2, visible: false },
                { questionSetId: 4, visible: true }
            ],
            name: 'panel-1',
            action: {},
            button: {
                text: '提交',
                visible: true,
                props: {
                    htmlType: 'submit',
                    type: 'primary'
                }
            }
        },
        {
            id: 2,
            index: 1,
            visible: false,
            disabled: false,
            questionSets: [{ questionSetId: 6, visible: true }],
            name: 'panel-3'
        },
        {
            id: 4,
            index: 5,
            visible: true,
            disabled: true,
            questionSets: [
                { questionSetId: 3, visible: true },
                { questionSetId: 5, visible: false },
                { questionSetId: 7, visible: true }
            ],
            name: 'panel-4'
        },
        {
            id: 5,
            index: 4,
            visible: true,
            disabled: true,
            questionSets: [
                { questionSetId: 3, visible: true },
                { questionSetId: 5, visible: false },
                { questionSetId: 8, visible: false }
            ],
            name: 'panel-4'
        },
        {
            id: 3,
            index: 2,
            visible: true,
            disabled: false,
            questionSets: [
                { questionSetId: 8, visible: false },
                { questionSetId: 5, visible: true },
                { questionSetId: 7, visible: false }
            ],
            name: 'panel-2'
        }
    ],
    questionSets: [
        {
            id: 1,
            name: 'questionSet-1',
            questionSetId: 1,
            questions: [
                { questionId: 1, visible: false },
                { questionId: 2, visible: true },
                { questionId: 7, visible: true }
            ]
        },
        {
            id: 2,
            name: 'questionSet-2',
            questionSetId: 2,
            questions: [
                { questionId: 3, visible: true },
                { questionId: 5, visible: true },
                { questionId: 6, visible: false }
            ]
        },
        {
            id: 3,
            name: 'questionSet-3',
            questionSetId: 3,
            questions: [
                { questionId: 4, visible: true },
                { questionId: 8, visible: false }
            ]
        },
        {
            id: 4,
            name: 'questionSet-4',
            questionSetId: 4,
            questions: [
                { questionId: 6, visible: false },
                { questionId: 9, visible: true },
                { questionId: 10, visible: false }
            ]
        },
        {
            id: 5,
            name: 'questionSet-5',
            questionSetId: 5,
            questions: [
                { questionId: 16, visible: false },
                { questionId: 12, visible: true },
                { questionId: 11, visible: false }
            ]
        }
    ],
    questions: [
        { id: 1, visible: true, questionId: 1, text: '1ff1', question: {}, validations: [] },
        { id: 2, visible: true, questionId: 2, text: '21es1', question: {}, validations: [] },
        { id: 12, visible: true, questionId: 3, text: '11', question: {}, validations: [] },
        {
            id: 11,
            visible: true,
            questionId: 4,
            text: '1sdf1',
            question: {},
            validations: []
        },
        { id: 3, visible: true, questionId: 5, text: '121', question: {}, validations: [] },
        { id: 5, visible: true, questionId: 6, text: '1fas1', question: {}, validations: [] },
        {
            id: 4,
            visible: false,
            questionId: 7,
            text: '1fsd1',
            question: {},
            validations: []
        },
        { id: 7, visible: true, questionId: 8, text: '1sdf1', question: {}, validations: [] },
        { id: 8, visible: true, questionId: 9, text: '1dfa1', question: {}, validations: [] },
        { id: 9, visible: false, questionId: 10, text: '11', question: {}, validations: [] },
        {
            id: 10,
            visible: true,
            questionId: 11,
            text: '11sdf',
            question: {},
            validations: []
        },
        {
            id: 13,
            visible: true,
            questionId: 12,
            text: '11dsf',
            question: {},
            validations: []
        },
        {
            id: 14,
            visible: false,
            questionId: 13,
            text: '231',
            question: {},
            validations: []
        },
        {
            id: 16,
            visible: true,
            questionId: 14,
            text: '1sdf1',
            question: {},
            validations: []
        },
        {
            id: 17,
            visible: true,
            questionId: 15,
            text: 'dfd11',
            question: {},
            validations: []
        }
    ]
};

export default schema;
