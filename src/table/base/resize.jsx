import React from 'react';
import { findDOMNode } from 'react-dom';
import T from 'prop-types';
import { events, dom } from '../../util';

class Resize extends React.Component {
    static propTypes = {
        prefix: T.string,
        rtl: T.bool,
        onChange: T.func,
        dataIndex: T.string,
        tableEl: T.any,
    };
    static defaultProps = {
        onChange: () => {},
    };
    componentWillUnmount() {
        this.destory();
    }
    onMouseDown = e => {
        this.lastPageX = e.pageX;
        events.on(document, 'mousemove', this.onMouseMove);
        events.on(document, 'mouseup', this.onMouseUp);
        this.unSelect();
    };
    onMouseMove = e => {
        const pageX = e.pageX;
        let changedPageX = pageX - this.lastPageX;

        if (this.props.rtl) {
            changedPageX = -changedPageX;
        }

        this.props.onChange(this.props.dataIndex, changedPageX);
        this.lastPageX = pageX;
    };
    onMouseUp = () => {
        this.destory();
    };
    destory() {
        events.off(document, 'mousemove', this.onMouseMove);
        events.off(document, 'mouseup', this.onMouseMove);
        this.select();
    }
    unSelect() {
        dom.setStyle(document.body, {
            userSelect: 'none',
            cursor: 'ew-resize',
        });
        document.body.setAttribute('unselectable', 'on');
        dom.addClass(this.resizeRef, 'resizing');
    }
    select() {
        dom.setStyle(document.body, {
            userSelect: '',
            cursor: '',
        });
        document.body.removeAttribute('unselectable');
        dom.removeClass(this.resizeRef, 'resizing');
    }
    render() {
        const { prefix } = this.props;
        return (
            <a
                className={`${prefix}table-resize-handler`}
                ref={r => {
                    this.resizeRef = r;
                }}
                onMouseDown={this.onMouseDown}
            />
        );
    }
}

export default Resize;
