import { gsap } from 'gsap'

export const fadeIn = (element: Element, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay,
    ease: 'power4.out',
  })
}

export const scaleIn = (element: Element, delay = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power4.out',
  })
}

export const textReveal = (element: Element, delay = 0) => {
  return gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power4.out',
  })
}

export const staggerChildren = (
  parent: Element,
  stagger = 0.2,
  from = { y: 50, opacity: 0 }
) => {
  return gsap.from(parent.children, {
    duration: 1,
    stagger,
    ease: 'power4.out',
    y: from.y,
    opacity: from.opacity,
  })
}

export const magneticEffect = (element: HTMLElement, strength = 0.3) => {
  let isHovering = false;
  let rafId: number;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = () => {
    if (!isHovering) {
      targetX = 0;
      targetY = 0;
    }

    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    gsap.to(element, {
      x: currentX,
      y: currentY,
      duration: 0,
    });

    rafId = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    isHovering = true;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    targetX = (e.clientX - centerX) * strength;
    targetY = (e.clientY - centerY) * strength;
  };

  const handleMouseLeave = () => {
    isHovering = false;
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  rafId = requestAnimationFrame(animate);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    cancelAnimationFrame(rafId);
  };
}; 