import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { obj, pickAttrs } from '../../util';

export default class Cell extends React.Component {
    static propTypes = {
        prefix: PropTypes.string,
        pure: PropTypes.bool,
        primaryKey: PropTypes.oneOfType([PropTypes.symbol, PropTypes.string]),
        className: PropTypes.string,
        record: PropTypes.any,
        value: PropTypes.any,
        isIconLeft: PropTypes.bool,
        colIndex: PropTypes.number,
        rowIndex: PropTypes.number,
        // 经过锁列调整后的列索引，lock right的列会从非0开始
        __colIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        title: PropTypes.any,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        context: PropTypes.any,
        cell: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]),
        align: PropTypes.oneOf(['left', 'center', 'right']),
        component: PropTypes.oneOf(['td', 'th', 'div']),
        children: PropTypes.any,
        style: PropTypes.object,
        innerStyle: PropTypes.object,
        filterMode: PropTypes.oneOf(['single', 'multiple']),
        filterMenuProps: PropTypes.object,
        filterProps: PropTypes.object,
        filters: PropTypes.array,
        sortable: PropTypes.bool,
        sortDirections: PropTypes.arrayOf(PropTypes.oneOf(['desc', 'asc', 'default'])),
        lock: PropTypes.any,
        type: PropTypes.oneOf(['header', 'body']),
        resizable: PropTypes.bool,
        __normalized: PropTypes.bool,
    };

    static defaultProps = {
        component: 'td',
        type: 'body',
        isIconLeft: false,
        cell: value => value,
        prefix: 'next-',
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.pure) {
            const isEqual = obj.shallowEqual(this.props, nextProps);
            return !isEqual;
        }
        return true;
    }

    render() {
        /* eslint-disable no-unused-vars */
        const {
            prefix,
            className,
            cell,
            value,
            resizable,
            colIndex,
            rowIndex,
            __colIndex,
            record,
            context,
            align,
            style = {},
            component: Tag,
            children,
            title,
            width,
            innerStyle,
            primaryKey,
            __normalized,
            filterMode,
            filterMenuProps,
            filterProps,
            filters,
            sortable,
            sortDirections,
            lock,
            pure,
            locale,
            expandedIndexSimulate,
            rtl,
            isIconLeft,
            type,
            htmlTitle,
            wordBreak,
            ...others
        } = this.props;
        const tagStyle = { ...style };
        const cellProps = { value, index: rowIndex, record, context };
        let content = cell;
        if (React.isValidElement(content)) {
            content = React.cloneElement(content, cellProps);
        } else if (typeof content === 'function') {
            content = content(value, rowIndex, record, context);
        }
        if (align) {
            tagStyle.textAlign = align;
            if (rtl) {
                tagStyle.textAlign = align === 'left' ? 'right' : align === 'right' ? 'left' : align;
            }
        }
        const cls = classnames({
            [`${prefix}table-cell`]: true,
            [`${prefix}table-word-break-${wordBreak}`]: !!wordBreak,
            [className]: className,
        });

        return (
            <Tag {...pickAttrs(others)} className={cls} style={tagStyle} role="gridcell">
                <div
                    className={`${prefix}table-cell-wrapper`}
                    style={innerStyle}
                    title={htmlTitle}
                    data-next-table-col={__colIndex}
                    data-next-table-row={rowIndex}
                >
                    {isIconLeft ? children : content}
                    {isIconLeft ? content : children}
                </div>
            </Tag>
        );
    }
}
