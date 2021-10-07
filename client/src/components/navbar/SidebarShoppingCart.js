import React, { useRef, Fragment, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'

import ItemCart from './ItemCart'
import { toVND } from '../../helper'
import '../../assets/styles/Csstransition/styles.css'
import { NavbarContext } from '../../context/NavbarContext'
import { CartContext } from '../../context/CartContext'
import { ContainerSlider, HeadCart, HeroCart, CloseCart, IconClose, ContainerCart, BodyCart, CartFooter, CartFooterWapper, CartTaxes, ButtonPrimary, Overlay, PointCenter, TotalPrice, EmptyCart, CartList } from '../../assets/styles/ElNavbar'


const SidebarShoppingCart = () => {
  const nodeRef = useRef(null)
  const { showShoppingCart, setShowShoppingCart } = useContext(NavbarContext)
  const { item: { product } } = useContext(CartContext)

  let total = 0;

  if (product.length) {
    total = toVND(product.reduce((prev, curr) => prev + curr.price_sale * curr.quality, 0))
  }

  return (
    <>
      <CSSTransition
        in={showShoppingCart}
        nodeRef={nodeRef}
        timeout={450}
        classNames="sidebarCart"
        unmountOnExit
      >
        <Fragment>
          <Overlay onClick={() => setShowShoppingCart(false)} />
          <ContainerSlider ref={nodeRef}>
            <HeadCart>
              <HeroCart>Giỏ hàng của bạn</HeroCart>
              <CloseCart onClick={() => setShowShoppingCart(false)}>
                <IconClose />
              </CloseCart>
            </HeadCart>
            <ContainerCart>
              {product.length ?
                <>
                  <BodyCart>
                    <CartList>
                      {
                        product.map((p, index) =>
                          <ItemCart delay={`0.${index + 3}s`} key={index} product={p} />
                        )
                      }
                    </CartList>
                  </BodyCart>
                  <CartFooter >
                    <CartFooterWapper>
                      <CartTaxes>Giá đã bao gồm thuế VAT và phí giao hàng miễn phí</CartTaxes>
                      <ButtonPrimary>
                        <span style={{ fontSize: '16px' }}>THANH TOÁN</span>
                        <PointCenter />
                        <TotalPrice>{total}</TotalPrice>
                      </ButtonPrimary>
                    </CartFooterWapper>
                  </CartFooter>
                </>
                :
                <>
                  <EmptyCart>Giỏ hàng của bạn trống</EmptyCart>
                </>
              }
            </ContainerCart>
          </ContainerSlider>
        </Fragment>
      </CSSTransition>
    </>
  )
}

export default SidebarShoppingCart
