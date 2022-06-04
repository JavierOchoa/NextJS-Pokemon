import React from 'react'
import { Spacer, useTheme } from '@nextui-org/react';
import { Text } from '@nextui-org/react';
import Link from 'next/link';

export const Navbar = () => {
    const {theme} = useTheme();
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0x 20px',
            backgroundColor: theme?.colors.gray900.value
        }}>
            <Link href={'/'}>
                <Text color='white' h3>Pokemon</Text>
            </Link>

            <Spacer css={{flex:1}}/>
            
            <Link href={'/favorites'}>
                <Text color='white' h3>Favoritos</Text>
            </Link>
        </div>
    )
}
