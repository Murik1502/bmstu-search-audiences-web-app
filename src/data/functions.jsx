export function mergeAudiencesTime(audiences, times) {
    const mergedAudiences = [];

    for (let i = 0; i < audiences.length; i++) {
        let currentAudience = { ...audiences[i] };

        for (let j = i + 1; j < audiences.length; j++) {
            if (currentAudience.number === audiences[j].number && isAdjacent(currentAudience.time, audiences[j].time, times)) {
                currentAudience.time = `${currentAudience.time.split(' - ')[0]} - ${audiences[j].time.split(' - ')[1]}`;
                i = j;
            } else {
                break;
            }
        }

        mergedAudiences.push(currentAudience);
    }

    return mergedAudiences;
}

function isAdjacent(time1, time2, times) {
    const time1End = time1.split(' - ')[1];
    const time2Start = time2.split(' - ')[0];
    for (let i = 0; i < times.length - 1; i++) {
        if (times[i].end === time1End && times[i+1].value === time2Start) {
            return true;
        }
    }
    return false;
}

export function mergeAdjacentCheckedTimes(times) {
    const selectedTimes = [];

    for (let i = 0; i < times.length; i++) {
        if (times[i].checked) {
            let start = times[i].value;
            let end = times[i].end;
            let j = i + 1;
            while (j < times.length && times[j].checked) {
                end = times[j].end;
                j++;
            }
            selectedTimes.push(`${start} - ${end}`);
            i = j - 1;
        }
    }
    return selectedTimes;
}