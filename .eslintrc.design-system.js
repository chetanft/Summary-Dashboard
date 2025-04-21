import reactPlugin from 'eslint-plugin-react';

export default {
  plugins: {
    react: reactPlugin
  },
  rules: {
    // Enforce usage of theme colors instead of hardcoded colors
    'no-restricted-properties': [
      'error',
      {
        object: 'sx',
        property: 'color',
        message: 'Use theme colors instead of hardcoded values. Example: color: "primary.main"'
      },
      {
        object: 'sx',
        property: 'backgroundColor',
        message: 'Use theme colors instead of hardcoded values. Example: backgroundColor: "background.paper"'
      },
      {
        object: 'sx',
        property: 'borderColor',
        message: 'Use theme colors instead of hardcoded values. Example: borderColor: "divider"'
      }
    ],

    // Enforce usage of Typography component for text
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          {
            element: 'h1',
            message: 'Use <Typography variant="h1"> instead'
          },
          {
            element: 'h2',
            message: 'Use <Typography variant="h2"> instead'
          },
          {
            element: 'h3',
            message: 'Use <Typography variant="h3"> instead'
          },
          {
            element: 'h4',
            message: 'Use <Typography variant="h4"> instead'
          },
          {
            element: 'h5',
            message: 'Use <Typography variant="h5"> instead'
          },
          {
            element: 'h6',
            message: 'Use <Typography variant="h6"> instead'
          },
          {
            element: 'p',
            message: 'Use <Typography variant="body1"> or <Typography variant="body2"> instead'
          },
          {
            element: 'span',
            message: 'Use <Typography variant="body2"> or <Typography variant="caption"> instead'
          }
        ]
      }
    ],

    // Enforce usage of core components
    'react/forbid-component-props': [
      'warn',
      {
        forbid: [
          {
            component: 'Card',
            props: ['elevation'],
            message: 'Consider using EnhancedMetricCard instead of Card for KPI metrics'
          },
          {
            component: 'Table',
            props: ['size'],
            message: 'Consider using StandardTable instead of Table for tabular data'
          },
          {
            component: 'Chip',
            props: ['color'],
            message: 'Consider using StatusBadge instead of Chip for status indicators'
          }
        ]
      }
    ],

    // Enforce usage of theme spacing
    'no-restricted-syntax': [
      'error',
      {
        selector: 'JSXAttribute[name.name="sx"] > JSXExpressionContainer > ObjectExpression > Property[key.name=/^(padding|margin|gap|top|right|bottom|left)$/]',
        message: 'Use theme spacing instead of hardcoded pixel values. Example: padding: 2 (which equals 16px)'
      }
    ],

    // Enforce usage of theme typography
    'react/forbid-component-props': [
      'warn',
      {
        forbid: [
          {
            component: 'Typography',
            props: ['fontSize', 'fontWeight'],
            message: 'Use typography variants instead of custom font styles. Example: <Typography variant="h4">Title</Typography>'
          }
        ]
      }
    ],

    // Enforce usage of theme shadows
    'no-restricted-properties': [
      'error',
      {
        object: 'sx',
        property: 'boxShadow',
        message: 'Use theme shadows instead of hardcoded values. Example: boxShadow: theme.shadows[2]'
      }
    ],

    // Enforce usage of theme breakpoints
    'no-restricted-properties': [
      'error',
      {
        object: 'sx',
        property: 'maxWidth',
        message: 'Use theme breakpoints instead of hardcoded values. Example: maxWidth: theme.breakpoints.values.md'
      },
      {
        object: 'sx',
        property: 'minWidth',
        message: 'Use theme breakpoints instead of hardcoded values. Example: minWidth: theme.breakpoints.values.sm'
      }
    ]
  }
};
