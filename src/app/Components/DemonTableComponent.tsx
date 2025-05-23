'use client'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Flex, Text, Table, Image, Anchor, useComputedColorScheme } from '@mantine/core'
import demonList from '../Data/demons.json' assert {type: "json"}
import variantDemonList from '../Data/variant_demons.json' assert {type: "json"}
import React from 'react'
import Link from 'next/link'

interface DemonTableProps {
    raceFilter: string,
    hidePlugins: boolean,
    displayVariants: boolean,
}

export default function DemonTableComponent({ raceFilter, hidePlugins, displayVariants }: DemonTableProps) {
    const colorScheme = useComputedColorScheme();

    const subTypes = [
        'Inexperienced ',
        'Illusion ',
        ' of Kuyo',
        'Wanderer ',
        'Accomplished ',
        'Vermillion Flame ',
        'Godly Golden Winged Bird ',
        'Hero of Akaeda ',
        'Unmatched Steel ',
        'Brave Red Capote ',
        'Noble Demon King ',
        'Blasted Road ',
        'Agent of God ',
        'Princess of Pure Madness ',
        'Seven Stars of Death ',
        'Agent of God ',
        'Nimble ',
        'Joyful ',
        'Prideful ',
        'Wrathful ',
        'Lustful ',
        'Magician ',
        'Mystic ',
        'Bringer of Aging ',
        'Pleasure Bringer ',
        'Huntress ',
        'Heaven-Piercing ',
        'Gojo Bridge ',
        ' of Assault',
        'Shana ',
        'Hassou Tobi ',
        'Horse '
    ]

    function cleanString(str: string): string {
        let result = str;
        for (const subtype of subTypes) {
            result = result.replace(subtype, '');
        }
        return result.trim();
    }

    let filteredDemonList: Demon[]

    if (raceFilter !== '') {
        if (hidePlugins) {
            if (displayVariants) {
                filteredDemonList = [...demonList, ...variantDemonList].filter((d: Demon) => d.Plugin[0] === false && d.Race === raceFilter)
            } else {
                filteredDemonList = demonList.filter((d: Demon) => d.Plugin[0] === false && d.Race === raceFilter)
            }
        } else {
            if (displayVariants) {
                filteredDemonList = [...demonList, ...variantDemonList].filter((demon: Demon) => demon.Race === raceFilter)
            } else {
                filteredDemonList = demonList.filter((demon: Demon) => demon.Race === raceFilter)
            }
        }
    } else {
        if (hidePlugins) {
            if (displayVariants) {
                filteredDemonList = [...demonList, ...variantDemonList].filter((d: Demon) => d.Plugin[0] === false)
            } else {
                filteredDemonList = demonList.filter((d: Demon) => d.Plugin[0] === false)
            }
        } else {
            if (displayVariants) {
                filteredDemonList = [...demonList, ...variantDemonList]
            } else {
                filteredDemonList = demonList
            }
        }
    }

    return (
        <Table.ScrollContainer minWidth={500}>
            <Table withTableBorder withColumnBorders>
                <Table.Thead
                    style={{
                        backgroundColor: `var(--mantine-color-${colorScheme === 'dark' ? 'dark-6' : 'gray-0'})`
                    }}
                >
                    <Table.Tr>
                        <Table.Th>
                            <Flex align='center' justify='center'>Race</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex align='center' justify='center'>Icon</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex align='center' justify='center'>Name</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex align='center' justify='center'>Level</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex align='center' justify='center'>Fusion Range</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex align='center' justify='center'>Plugin</Flex>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredDemonList.filter((d: Demon) => d.Variant !== true).map((demon, index) => {
                        const imageName: string = cleanString(demon.Name)
                        return (
                            <React.Fragment key={`fragment-row-${index}`}>
                                <Table.Tr key={`row-${index}`}>
                                    {demon.Special && demon.Special.length > 0
                                        ?
                                        <React.Fragment key={`race-name-level-${index}`}>
                                            <Table.Td key={`race-${index}`} rowSpan={demon.Special.length}>{demon.Race}</Table.Td>
                                            <Table.Td key={`icon-${index}`} rowSpan={demon.Special.length}><Flex key={`icon-flex-${index}`} align='center' justify='center'><Image fallbackSrc='/Blank.png' key={`icon-${index}`} src={`/Icons/${imageName}.png`} alt={demon.Name} title={demon.Name} w={32} h={32} /></Flex></Table.Td>
                                            <Table.Td key={`name-${index}`} rowSpan={demon.Special.length}><Anchor component={Link} href={{ pathname: '/fusions', query: { demon: demon.Name } }}>{demon.Name}</Anchor></Table.Td>
                                            <Table.Td key={`level-${index}`} rowSpan={demon.Special.length}><Flex key={`level-flex-${index}`} align='center' justify='center'>{demon.Level}</Flex></Table.Td>
                                        </React.Fragment>
                                        :
                                        <React.Fragment key={`race-name-level-${index}`}>
                                            <Table.Td key={`race-${index}`}>{demon.Race}</Table.Td>
                                            <Table.Td key={`icon-${index}`}><Flex key={`icon-flex-${index}`} align='center' justify='center'><Image fallbackSrc='/Blank.png' key={`icon-${index}`} src={`/Icons/${imageName}.png`} alt={demon.Name} title={demon.Name} w={32} h={32} /></Flex></Table.Td>
                                            <Table.Td key={`name-${index}`}><Anchor component={Link} href={{ pathname: '/fusions', query: { demon: demon.Name } }}>{demon.Name}</Anchor></Table.Td>
                                            <Table.Td key={`level-${index}`}><Flex key={`level-flex-${index}`} align='center' justify='center'>{demon.Level}</Flex></Table.Td>
                                        </React.Fragment>
                                    }
                                    {demon.Range
                                        ?
                                        <React.Fragment key={`range-fragment-${index}`}>
                                            {typeof (demon.Range[0]) === 'number' ?
                                                <Table.Td key={`range-${index}`}>
                                                    {demon.Range[0]}{demon.Range[1] && ` - ${demon.Range[1]}`}{!demon.Range[1] && '+'}
                                                </Table.Td>
                                                :
                                                <Table.Td key={`range-${index}`}>
                                                    <Text key={`no-fusion-range-text-${index}`} c='red' size='sm'>{demon.Range[0]}</Text>
                                                </Table.Td>
                                            }
                                            <Table.Td key={`plugin-${index}-${0}`}>
                                                <Flex key={`plugin-flex-${index}`} align='center' justify='center'>
                                                    {demon.Plugin[0] ? <IconCheck size={16} /> : <IconX size={16} />}
                                                </Flex>
                                            </Table.Td>

                                        </React.Fragment>
                                        :
                                        demon.Special &&
                                        <React.Fragment key={`special-row-${index}-0`}>
                                            <Table.Td key={`special-${index}-0`}>
                                                <Anchor component={Link} href={{ pathname: '/fusions', query: { demon: demon.Special[0][0] } }}>{demon.Special[0][0]}</Anchor>
                                                {demon.Special[0][1] && ' x '}
                                                {demon.Special[0][1] && <Anchor component={Link} href={{ pathname: '/fusions', query: { demon: demon.Special[0][1] } }}>{demon.Special[0][1]}</Anchor>}
                                                {demon.Special[0][2] && ' x '}
                                                {demon.Special[0][2] && <Anchor component={Link} href={{ pathname: '/fusions', query: { demon: demon.Special[0][2] } }}>{demon.Special[0][2]}</Anchor>}
                                            </Table.Td>
                                            <Table.Td key={`plugin-${index}-0`}>
                                                <Flex key={`plugin-flex-${index}`} align='center' justify='center'>
                                                    {demon.Plugin[0] ? <IconCheck size={16} /> : <IconX size={16} />}
                                                </Flex>
                                            </Table.Td>
                                        </React.Fragment>
                                    }
                                </Table.Tr >
                                {!demon.Range && demon.Special && demon.Special.length > 1 &&
                                    demon.Special.slice(1).map((line, indexSpecial) => (
                                        <Table.Tr key={`special-row-${index}-${indexSpecial}`}>
                                            <Table.Td key={`special-${index}-${indexSpecial}`}>
                                                <Anchor component={Link} href={{ pathname: '/fusions', query: { demon: line[0] } }}>{line[0]}</Anchor>
                                                {line[1] && ' x '}
                                                {line[1] && <Anchor component={Link} href={{ pathname: '/fusions', query: { demon: line[1] } }}>{line[1]}</Anchor>}
                                                {line[2] && ' x '}
                                                {line[2] && <Anchor component={Link} href={{ pathname: '/fusions', query: { demon: line[2] } }}>{line[2]}</Anchor>}
                                            </Table.Td>
                                            <Table.Td key={`plugin-${index}-${indexSpecial}`}>
                                                <Flex key={`plugin-flex-${index}`} align='center' justify='center'>
                                                    {demon.Plugin[indexSpecial + 1] ? <IconCheck size={16} /> : <IconX size={16} />}
                                                </Flex>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                }
                            </React.Fragment >
                        )
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}