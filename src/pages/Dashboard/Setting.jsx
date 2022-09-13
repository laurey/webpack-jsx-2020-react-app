import React, { Component } from 'react';
import Stack from '@/components/Stack';

export default class Setting extends Component {
    render() {
        return (
            <div>
                <h2>Setting</h2>
                <p>This is Dashboard Setting page</p>
                <Stack spacing={24}>
                    <Stack.Item>aaa</Stack.Item>
                    <Stack.Item>bbb</Stack.Item>
                    <Stack.Item square>ccc</Stack.Item>
                </Stack>
                <Stack spacing={12} direction="row">
                    <Stack.Item>aaa111</Stack.Item>
                    <Stack.Item>bbb222</Stack.Item>
                    <Stack.Item square>ccc333</Stack.Item>
                </Stack>
                <Stack spacing={12} justifyContent="center" direction="row">
                    <Stack.Item>11</Stack.Item>
                    <Stack.Item>22</Stack.Item>
                    <Stack.Item square>33</Stack.Item>
                </Stack>
                <Stack
                    spacing={12}
                    justifyContent="center"
                    // alignItems="center"
                    direction="row"
                    style={{ height: 200, backgroundColor: '#ccc' }}
                >
                    <Stack.Item>qq</Stack.Item>
                    <Stack.Item>ww</Stack.Item>
                    <Stack.Item square>ee</Stack.Item>
                </Stack>
                <Stack
                    spacing={12}
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    style={{ height: 200, backgroundColor: '#cff' }}
                >
                    <Stack.Item>qq</Stack.Item>
                    <Stack.Item>ww</Stack.Item>
                    <Stack.Item square>ee</Stack.Item>
                </Stack>
                <Stack
                    spacing={12}
                    justifyContent="space-around"
                    alignItems="flex-end"
                    direction="row"
                    style={{ height: 200, backgroundColor: '#cee' }}
                >
                    <Stack.Item>qq</Stack.Item>
                    <Stack.Item>ww</Stack.Item>
                    <Stack.Item square>ee</Stack.Item>
                </Stack>
            </div>
        );
    }
}
