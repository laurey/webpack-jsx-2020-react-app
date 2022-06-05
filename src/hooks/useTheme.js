import { useState } from 'react';
import { getRandomInt } from '../utils/utils';

const themes = [
    'Candy',
    'SpaceGray',
    'Silver',
    'MaterialDesign',
    'Ins',
    'Geeks',
    'Falcon',
    'Peachpuff',
    'Morning',
    'Shine',
    'Cyber Punk',
    'Desert',
    'Blue',
    'Industry',
    'Spark',
    'Nova',
    'Space',
    'Coach'
];

export default function useTheme() {
    const [theme, setTheme] = useState(themes[0]);
    const updateTheme = data => {
        return new Promise(resolve => {
            setTimeout(() => {
                setTheme(themes[getRandomInt(0, themes.length)]);
                resolve();
            }, 200);
        });
    };

    return {
        theme,
        updateTheme
    };
}
