import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { Flex, Table, useComputedColorScheme } from "@mantine/core";

interface ElementInfoProps {
    elements: string[]
}

export default function ElementInfoComponent({ elements }: ElementInfoProps) {
    const colors: string[] = elements.map((e: string) => e === 'Down' ? 'red' : 'green')
    const colorScheme = useComputedColorScheme()

    return (
        <Table align={'center'} withTableBorder withColumnBorders>
            <Table.Thead
                style={{
                    backgroundColor: `var(--mantine-color-${colorScheme === 'dark' ? 'dark-6' : 'gray-0'})`
                }}
            >
                <Table.Tr>
                    <Table.Th colSpan={4}><Flex justify={'center'}>Elemental Fusion</Flex></Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th><Flex justify={'center'}>Erthys</Flex></Table.Th>
                    <Table.Th><Flex justify={'center'}>Aeros</Flex></Table.Th>
                    <Table.Th><Flex justify={'center'}>Aquans</Flex></Table.Th>
                    <Table.Th><Flex justify={'center'}>Flaemis</Flex></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td><Flex justify={'center'}>{elements[0] === 'Down' ? <IconArrowDown color={colors[0]} /> : <IconArrowUp color={colors[0]} />}</Flex></Table.Td>
                    <Table.Td><Flex justify={'center'}>{elements[1] === 'Down' ? <IconArrowDown color={colors[1]} /> : <IconArrowUp color={colors[1]} />}</Flex></Table.Td>
                    <Table.Td><Flex justify={'center'}>{elements[2] === 'Down' ? <IconArrowDown color={colors[2]} /> : <IconArrowUp color={colors[2]} />}</Flex></Table.Td>
                    <Table.Td><Flex justify={'center'}>{elements[3] === 'Down' ? <IconArrowDown color={colors[3]} /> : <IconArrowUp color={colors[3]} />}</Flex></Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    )
}