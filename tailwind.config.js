import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** EquiForge Design System - colors from resources/css/equiforge.css */
const equiforgeColors = {
    primary: {
        100: '#f3eef2',
        200: '#cdbac7',
        300: '#b398ac',
        400: '#9a7590',
        500: '#815374',
        600: '#67425d',
        700: '#4d3246',
        800: '#34212e',
    },
    secondary: {
        100: '#dbe7e8',
        200: '#b8cfd2',
        300: '#94b6bb',
        400: '#719ea5',
        500: '#4d868e',
        600: '#3e6b72',
        700: '#2e5055',
        800: '#1f3639',
    },
    success: {
        100: '#dcede7',
        200: '#b8dbce',
        300: '#95cab6',
        400: '#71b89d',
        500: '#4ea685',
        600: '#3e856a',
        700: '#2f6450',
        800: '#1f4235',
    },
    warning: {
        100: '#fff4d4',
        200: '#ffe8a9',
        300: '#ffdd7d',
        400: '#ffd152',
        500: '#ffc627',
        600: '#cc9e1f',
        700: '#997717',
        800: '#664f10',
    },
    danger: {
        100: '#f8e9e9',
        200: '#e3a6a6',
        300: '#d47979',
        400: '#c64d4d',
        500: '#b82020',
        600: '#931a1a',
        700: '#6e1313',
        800: '#4a0d0d',
    },
    info: {
        100: '#e6f3fa',
        200: '#9acee9',
        300: '#67b5dd',
        400: '#359dd2',
        500: '#0284c7',
        600: '#026a9f',
        700: '#014f77',
        800: '#013550',
    },
    black: {
        100: '#e7e6e6',
        200: '#9d9a9a',
        300: '#6c6768',
        400: '#3b3535',
        500: '#0a0203',
    },
    custom: {
        silver: '#a7a7a7',
        neutral: '#fff8f3',
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                ...equiforgeColors,
            },
            fontSize: {
                'ef-h1': ['48px', { lineHeight: '54px' }],
                'ef-h2': ['40px', { lineHeight: '48px' }],
                'ef-h3': ['32px', { lineHeight: '40px' }],
                'ef-h4': ['32px', { lineHeight: '40px' }],
                'ef-h5': ['28px', { lineHeight: '36px' }],
                'ef-h6': ['24px', { lineHeight: '30px' }],
                'ef-p': ['16px', { lineHeight: '22px' }],
                'ef-label': ['14px', { lineHeight: '18px' }],
                'ef-small': ['12px', { lineHeight: '16px' }],
                'ef-xsmall': ['10px', { lineHeight: '14px' }],
            },
            letterSpacing: {
                'ef-tight': '0.02em',
                'ef-normal': '0.03em',
                'ef-wide': '0.05em',
            },
            fontWeight: {
                'ef-light': '300',
                'ef-regular': '400',
                'ef-medium': '500',
                'ef-semibold': '600',
                'ef-bold': '700',
            },
        },
    },

    plugins: [forms],
};
