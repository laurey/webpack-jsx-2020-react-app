import React, { Component } from 'react';
import classNames from 'classnames';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Col, Row } from 'antd';

import SortCard from './Card';
import styles from './style.css';

const DragHandle = sortableHandle(() => (
    <span style={{ cursor: 'row-resize', padding: 10 }}>
        <svg viewBox="0 0 50 50">
            <path
                d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"
                color="#000"
            />
        </svg>
    </span>
));

const SortableItem = sortableElement(
    ({
        value,
        eventKey,
        className,
        disabled,
        dragOver,
        dragOverGapTop,
        dragOverGapBottom,
        dropContainerKey,
        dropTargetKey,
        draggingNodeKey
    }) => {
        const dragging = draggingNodeKey === eventKey;
        return (
            <Col
                data-did={value.id}
                className={classNames('sortable-card-item', className, {
                    dragging,
                    [styles.dragging]: dragging
                })}
            >
                <SortCard extra={<DragHandle />} {...value} disabled={disabled} dragging={dragging} />
            </Col>
        );
    }
);

const SortableContainer = sortableContainer(({ children }) => {
    return <Row gutter={16}>{children}</Row>;
});

class SortContainer extends Component {
    state = {
        isSorting: false,
        draggingNodeKey: null,
        items: [
            { id: 1, title: 'Item title 1', content: 'item content 11' },
            { id: 2, title: 'Item title 2', content: 'item content 22' },
            { id: 3, title: 'Item title 3', content: 'item content 33' },
            { id: 4, title: 'Item title 4', content: 'item content 44' },
            { id: 5, title: 'Item title 5', content: 'item content 55' },
            { id: 6, title: 'Item title 6', content: 'item content 66' }
        ]
    };

    containerRef = React.createRef();

    onSortStart = (sortEvent, nativeEvent) => {
        const { node, index } = sortEvent;
        const { items } = this.state;
        const sortedItem = items[index];

        this.setState({
            isSorting: true,
            draggingNodeKey: sortedItem.id
        });
    };

    onSortMove = () => {};

    onSortOver = sortEvent => {
        const { index, oldIndex, newIndex, collection, isKeySorting, helper: node } = sortEvent;
        // node.style.cursor = 'grabbing';
        // node.style.color = 'red';
    };

    onSortEnd = sortEvent => {
        const { oldIndex, newIndex, nodes } = sortEvent;

        const { node } = nodes[newIndex];

        this.setState(
            prev => {
                const { items } = prev;
                const data = {};
                if (oldIndex !== newIndex) {
                    const newItems = arrayMove(items, oldIndex, newIndex);
                    Object.assign(data, {
                        items: newItems
                    });
                }

                return {
                    ...prev,
                    ...data,
                    isSorting: false,
                    draggingNodeKey: null
                };
            },
            () => {
                // eslint-disable-next-line no-console
                console.log('sort-end!!!');
            }
        );
    };

    render() {
        const { items, draggingNodeKey } = this.state;

        return (
            <div ref={this.containerRef} className={styles.container}>
                <SortableContainer
                    useDragHandle
                    // lockAxis="y"
                    pressDelay={10}
                    pressThreshold={10}
                    hideSortableGhost={false}
                    // lockOffset={['0%', '100%']}
                    onSortEnd={this.onSortEnd}
                    onSortOver={this.onSortOver}
                    onSortMove={this.onSortMove}
                    onSortStart={this.onSortStart}
                    helperContainer={this.containerRef.current}
                >
                    {items.map((value, index) => (
                        <SortableItem
                            key={`item-${value.id}`}
                            index={index}
                            value={value}
                            eventKey={value.id}
                            disabled={value.disabled}
                            draggingNodeKey={draggingNodeKey}
                        />
                    ))}
                </SortableContainer>
            </div>
        );
    }
}

export default SortContainer;
