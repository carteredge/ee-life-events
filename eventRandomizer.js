const EVENT_BASE_PROBABILITY = 0.5;

function randomize() {
    const randomizedData = new Randomizer(data, ["history"]).randomize();
    document.getElementById("randomizer-target").innerHTML = `<li>${
        randomizedData.history
        .join("</li><li>")}</li>`;
}
// function randomNode(randomizedData, dataSet) {
//     const tags = randomizedData.filter(n => n.tags)
//         .reduce((total, node) => {
//             Array.isArray(node.tags) ?
//             total.push(...node.tags) :
//             total.push(node.tags);
//             return total;
//         }, []);
//     return {...Randomizer.randElem(
//         dataSet.filter(node => {
//             const meetsRequirements = node.requiredTags?.length ?
//                 Array.isArray(node.requiredTags) ?
//                     node.requiredTags.every(n => tags.includes(n)) :
//                     tags.includes(node.requiredTags) :
//                 true;
//             const restricted = node.restrictedTags?.length ?
//                 Array.isArray(node.restrictedTags) ?
//                     node.restrictedTags.some(n => tags.includes(n)) :
//                     tags.includes(restrictedTags) :
//                 false;
//             return meetsRequirements && !restricted;
//         }
//     ))};
// }

// function randomizeFromTagTree(dataSet)  {
//     dataSet = dataSet || data;
//     let keepGoing;
//     const randomizedTreeData = [];
//     do {
//         const event = randomNode(randomizedTreeData, dataSet)
//         event &&
//             Object.keys(event).length &&
//             randomizedTreeData.push(event);
//         while (randomizedTreeData[randomizedTreeData.length - 1].next) {
//             const nextNode = randomNode(randomizedTreeData, randomizedTreeData[randomizedTreeData.length - 1].next);
//             if (!nextNode || !Object.keys(nextNode).length)
//                 break;
//             randomizedTreeData.push(nextNode);
//         }
//         keepGoing = Math.random() < EVENT_BASE_PROBABILITY;
//     } while (keepGoing);

//     for (let event of randomizedTreeData) {
//         let prevString;
//         let value = event.value;
//         do {
//             prevString = value;
//             value = value.replace(/\{(\w+)\}/g, (m, g) => 
//                 Randomizer.randElem(eventData[g]));
//         } while (value != prevString);
//         event.value = value;
//     }

//     return randomizedTreeData;
// }