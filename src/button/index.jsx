import ConfigProvider from '../config-provider';
import Button from './view/button';
import ButtonGroup from './view/group';

Button.Group = ButtonGroup;

export default ConfigProvider.config(Button, {
    transform: /* istanbul ignore next */ (props, deprecated) => {
        if ('shape' in props) {
            deprecated('shape', 'text | warning | ghost', 'Button');

            const { shape, type, ...others } = props;

            let newType = type;
            if (type === 'light' || type === 'dark' || (type === 'secondary' && shape === 'warning')) {
                newType = 'normal';
            }

            let ghost;
            if (shape === 'ghost') {
                ghost = {
                    primary: 'dark',
                    secondary: 'dark',
                    normal: 'light',
                    dark: 'dark',
                    light: 'light',
                }[type || Button.defaultProps.type];
            }

            const text = shape === 'text';
            const warning = shape === 'warning';

            props = { type: newType, ghost, text, warning, ...others };
        }

        if ('type' in props) {
            const { type, model, ...others } = props;

            let newType = type;
            let newModel = model;
            if (type === 'secondary') {
                deprecated(
                    "type: PropTypes.oneOf(['primary', 'secondary', 'normal'])",
                    "type: PropTypes.oneOf(['normal', 'primary', 'warning', 'inverse]) | model: PropTypes.oneOf(['solid', 'outline', 'text'])",
                    'Button'
                );
                [newType, newModel] =
                    'text' in props || newModel === 'text' ? [type, 'text'] : ['primary', newModel || 'outline'];
            }

            props = { type: newType, model: newModel, ...others };
        }

        if ('warning' in props) {
            deprecated('warning', "type: PropTypes.oneOf(['normal', 'primary', 'warning', 'inverse])", 'Button');
            const { type, model, warning, ...others } = props;

            let newType = type;
            let newModel = model;
            if (warning) {
                newModel =
                    newModel ||
                    {
                        normal: 'solid',
                        primary: 'outline',
                        warning: 'solid',
                        inverse: 'solid',
                    }[type || Button.defaultProps.type];
                newType = 'warning';
            }

            props = { type: newType, model: newModel, ...others };
        }

        if ('text' in props) {
            deprecated('text', "model: PropTypes.oneOf(['solid', 'outline', 'text'])", 'Button');
            const { model, text, ...others } = props;

            let newModel = model;
            if (text) {
                newModel = 'text';
            }

            props = { model: newModel, ...others };
        }

        if ('ghost' in props) {
            deprecated('ghost', "type: PropTypes.oneOf(['normal', 'primary', 'warning', 'inverse])", 'Button');
        }

        return props;
    },
});
