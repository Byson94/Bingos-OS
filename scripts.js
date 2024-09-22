// Open a window
function openWindow(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = 'block';
    dragElement(appWindow, document.getElementById(`title-bar-${appId}`));
}

// Function to handle menu item click
function onwindow(appId) {
    openWindow(appId);
}

// Close a window
function closeWindow(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = 'none';
}

// Minimize a window
function minimizeWindow(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = 'none';
}

let previousState = {}; // Store previous size and position

// Maximize/restore a window
function maximizeWindow(appId) {
    const appWindow = document.getElementById(appId);
    if (!appWindow.classList.contains('maximized')) {
        previousState[appId] = {
            width: appWindow.style.width,
            height: appWindow.style.height,
            top: appWindow.style.top,
            left: appWindow.style.left
        };

        appWindow.style.width = window.innerWidth + 'px';
        appWindow.style.height = window.innerHeight + 'px';
        appWindow.style.top = '0';
        appWindow.style.left = '0';
        appWindow.classList.add('maximized');
    } else {
        appWindow.style.width = previousState[appId].width;
        appWindow.style.height = previousState[appId].height;
        appWindow.style.top = previousState[appId].top;
        appWindow.style.left = previousState[appId].left;
        appWindow.classList.remove('maximized');
    }
}

// Function to make window draggable
function dragElement(elmnt, titleBar) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    let translateX = 0;
    let translateY = 0;

    titleBar.style.cursor = 'grab';
    elmnt.style.willChange = 'transform';
    titleBar.addEventListener('pointerdown', dragMouseDown);

    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = true;
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.addEventListener('pointerup', closeDragElement);
        document.addEventListener('pointermove', drag);
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        translateX -= pos1;
        translateY -= pos2;

        requestAnimationFrame(() => {
            elmnt.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    }

    function closeDragElement() {
        isDragging = false;
        document.removeEventListener('pointerup', closeDragElement);
        document.removeEventListener('pointermove', drag);
        titleBar.style.cursor = 'grab'; // Reset cursor
    }

    // Add cursor change on hover
    titleBar.onmouseenter = () => titleBar.style.cursor = 'grab';
    titleBar.onmouseleave = () => titleBar.style.cursor = isDragging ? 'grabbing' : 'grab';
}

// Enable resizing functionality with aspect-ratio scaling
const resizers = document.querySelectorAll('.resizer');
resizers.forEach(resizer => {
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const element = resizer.parentElement;
        const aspectRatio = element.offsetWidth / element.offsetHeight; // Get the initial aspect ratio

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function resize(e) {
            let newWidth = e.pageX - element.getBoundingClientRect().left;
            let newHeight = newWidth / aspectRatio; // Maintain aspect ratio
            
            if (newWidth >= 200 && newHeight >= 300) {
                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
            }
        }

        function stopResize() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }
    });
});

function startmenuClicked() {
    const startMenu = document.getElementById('startMenu');

    if (startMenu.classList.contains('show')) {
        startMenu.classList.remove('show');
        setTimeout(() => {
            startMenu.style.display = 'none';
        }, 100);
    } else {
        startMenu.style.display = 'block'; 
        setTimeout(() => {
            startMenu.classList.add('show');
        }, 10);
    }
}

document.addEventListener('click', function (e) {
    const startMenu = document.getElementById('startMenu');
    if (startMenu.classList.contains('show') && !startMenu.contains(e.target)) {
        startMenu.classList.remove('show');
        setTimeout(() => {
            startMenu.style.display = 'none';
        }, 100);
    }
});
