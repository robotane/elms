const updateStyle = (toggled) => {
    const getStyle = getComputedStyle(document.documentElement);
    document.documentElement.style.setProperty(
        '--side-bar-width',
        !toggled
            ? getStyle.getPropertyValue('--side-bar-mini-width')
            : getStyle.getPropertyValue('--side-bar-default-width')
    );
};

export default updateStyle;
