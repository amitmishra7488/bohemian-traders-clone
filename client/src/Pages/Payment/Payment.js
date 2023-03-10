import { Heading, Flex, Spacer, ButtonGroup, Grid, GridItem, Image, Stat, Text, Accordion, AccordionButton, AccordionIcon, AccordionPanel, Box, AccordionItem, Input, Button, Radio, Checkbox, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { accountsUrl } from "../../Deployed-server-url/deployed-server-url"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

import { LineChartOutlined } from '@ant-design/icons';
function Payment(props) {
    const navigate = useNavigate()
    const [state, setState] = useState([])
    const [totalCoupon, settotalCoupon] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [CouponOpen, setCouponOpen] = useState(false)
    const [Coupon, setCoupon] = useState(false)
    const [Payment, setPayment] = useState(true)
    const [cardname, setcardname] = useState([])
    const [cardnumber, setcardnumber] = useState([])
    const [carddate, setcarddate] = useState([])
    const [cardcvv, setcardcvv] = useState([])
    let total = 0;
    const toast = useToast();

    async function display(){
        const userId = localStorage.getItem('userId');
        console.log(userId)
        if(!userId) return alert('User not found')
        try {
            const {data} = await axios.get("https://bohemian-backend.vercel.app/user/cart", {
            params: {
                userId
            }
            })
            setState(data);
            console.log(state)

        } catch (error) {
            alert('error in fetching cart item')
        }
    }

    useEffect(() => {
        
        display();

        
    }, [])
    function SubCoupon() {
        if (Coupon == 'masai' && totalCoupon == 0) {
            toast({
                title: ` Hurry ! you save US $ ${(total / 10) * 3}`,
                status: 'success',
                isClosable: true,
            })
            settotalCoupon((total / 10) * 3)
            settotalPrice(total - totalCoupon)
        }
        else {
            return toast({
                title: 'please enter correct coupon',
                status: 'error',
                isClosable: true,
            })
        }
        console.log(total, "after coupon")
    }
    return (
        state.length > 0 ?
            <div><Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} w={['95%', '90%']} margin={'auto'} gap={1}>
                <GridItem bg={'yellow.50'}  >

                    {state.length > 0 ? <Grid templateColumns='repeat(1, 1fr)' border={'1px solid gray'} margin={'auto'} gap={1}>
                        <GridItem w={['100%']} margin={'auto'} h='50' border={'1px solid gray'} alignItems={'center'} textAlign={'center'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text>Order Summary</Text>
                            <Link to={'/cart'}>Edit Cart</Link>
                        </GridItem>
                        <GridItem maxH={'400px'} scrollBehavior={'smooth'} overflowY={'scroll'}  >    
                        {state.map((el) => {
                            total = total + (el.product.price * el.quantity);
                            return <Grid  templateColumns='repeat(1, 1fr)' w={'100%'} margin={'auto'} gap={1}>
                                <GridItem w={['100%']} margin={'auto'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Image w={'100px'} h={'100px'} src={el.product.img.item1} />
                                    <GridItem w={['100%']} ml={'40px'}>
                                        <Text>{el.product.name}</Text>
                                        <Text>Quantity: {el.quantity}</Text>
                                    </GridItem>
                                    <GridItem style={{ display: 'flex' }} w={['100%']} ml={'40px'}>
                                        <Text>US$  {el.quantity * el.product.price}</Text>
                                    </GridItem>
                                </GridItem>
                            </Grid>
                        })}
                        </GridItem>
                        <Grid border={'1px solid gray'}>

                            <GridItem border={'1px solid gray'} p={'30px'} w={['100%']} margin={'auto'} h='50' alignItems={'center'} textAlign={'center'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Subtotal</Text>
                                <Text>{total}</Text>
                            </GridItem>
                            <GridItem border={'1px solid gray'} p={'30px'} w={['100%']} margin={'auto'} h='50' alignItems={'center'} textAlign={'center'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Shipping</Text>
                                <Text>+{total < 500 ? 40 : 0}</Text>

                            </GridItem>
                            <GridItem border={'1px solid gray'} p={'30px'} w={['100%']} margin={'auto'} h='50' alignItems={'center'} textAlign={'center'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Tax</Text>
                                <Text>+{Math.ceil(total / 11)}</Text>
                            </GridItem>
                            {/* <Grid p={'30px'} style={{ display: 'flex', justifyContent: 'space-between' }}><Text>total Coupon</Text><Text>= {totalCoupon}</Text></Grid> */}
                            <GridItem border={'1px solid gray'} p={'30px'} w={['100%']} margin={'auto'} b={'1px solid gray'} alignItems={'center'} textAlign={'center'} style={{ justifyContent: 'space-between' }}>
                                <Link onClick={() => {
                                    CouponOpen ? setCouponOpen(false) : setCouponOpen(true);
                                }}>Coupon/Gift Certificate</Link>
                                {CouponOpen ? <Input onChange={(e) => {
                                    setCoupon(e.target.value);
                                }} w={'80%'}></Input> : null}
                                {CouponOpen ? <Button onClick={SubCoupon}>Submit</Button> : null}
                            </GridItem>
                        </Grid>
                        <GridItem p={'30px'} w={['100%']} margin={'auto'} h='50' alignItems={'center'} textAlign={'center'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text fontSize={'3vh'} as={'b'}>Estimated Total (USD)	</Text>
                            <Text fontSize={'3vh'} as={'b'} >US$ {() => {
                                if (total < 500) {
                                    total = total + 40
                                }
                                total = total + 10
                                settotalPrice(total)
                            }}
                                {total - totalCoupon + 10}</Text>

                        </GridItem>
                    </Grid> : <Text fontSize={'50px'}>Cart id Empty</Text>}
                </GridItem>
                <GridItem>
                    <Grid templateColumns='repeat(1, 1fr)' margin={'auto'} gap={1}>
                        <GridItem>
                            <Text align={'center'} fontSize={'5vh'} onClick={() => {
                                Payment ? setPayment(false) : setPayment(true);
                            }}>Payment</Text>
                        </GridItem>
                        <GridItem>
                            {Payment ? <Box>
                                <Flex minWidth='max-content' alignItems='center' gap='2'>
                                    <Box p='2'>
                                        <Heading size='md'>Credit Card</Heading>
                                    </Box>
                                    <Spacer />
                                    <ButtonGroup gap='2'>
                                        <Image h={'50px'} w={"50px"} src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png?20210817144358' />
                                        <Image h={'50px'} w={"50px"} src='https://cdn-icons-png.flaticon.com/512/217/217425.png' />
                                    </ButtonGroup>
                                </Flex>
                                <Grid templateColumns='repeat(2, 1fr)' border={'1px solid gray'} margin={'auto'} gap={6}>

                                    <Input id='cardnumber' type={'tel'} placeholder='Credit Card Number' variant='filled' onChange={(e) => setcardnumber(e.target.value)} />
                                    <Input id='carddate' type={'month'} variant='filled' onChange={(e) => setcarddate(e.target.value)} />
                                    <Input id='cardname' placeholder='Credit Card Name' variant='filled' onChange={(e) => setcardname(e.target.value)} />
                                    <Input id='cvv' placeholder='CVV' type={'password'} variant='filled' onChange={(e) => setcardcvv(e.target.value)} />
                                </Grid>
                                <Text>Terms and Conditions</Text>
                                <Checkbox defaultChecked>Yes, I agree with the <Link>'terms and conditions.'</Link></Checkbox>
                                <Button w={'100%'} colorScheme='blackAlpha' textColor={'white'} onClick={(e) => {

                                        toast({
                                            position:'top',
                                            title: 'Order Placed Successfully',
                                            status: 'success',
                                            isClosable: true,
                                        })                                       
                                        navigate('/')
                                }}>

                                    <Link>PLACE ORDER</Link>
                                </Button>
                            </Box> : null}
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid></div> : <div>'Loading...'</div>
    );
}

export default Payment;