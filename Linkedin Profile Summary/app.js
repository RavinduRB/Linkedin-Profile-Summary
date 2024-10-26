document.getElementById('fetchProfile').addEventListener('click', function() {
    const profileUrl = document.getElementById('profileUrl').value;
    if (!validateLinkedInUrl(profileUrl)) {
        document.getElementById('error').innerText = "Invalid LinkedIn URL!";
        document.getElementById('error').style.display = "block";
        return;
    }

    document.getElementById('loading').style.display = "block";
    fetchProfileData(profileUrl);
});

function validateLinkedInUrl(url) {
    const regex = /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9_-]+$/;
    return regex.test(url);
}

function fetchProfileData(profileUrl) {
    fetch('php/linkedin_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileUrl: profileUrl })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading').style.display = "none";
        if (data.error) {
            document.getElementById('error').innerText = data.error;
            document.getElementById('error').style.display = "block";
        } else {
            displayProfileData(data);
        }
    })
    .catch(error => {
        document.getElementById('loading').style.display = "none";
        document.getElementById('error').innerText = "Error fetching profile data.";
        document.getElementById('error').style.display = "block";
    });
}

function displayProfileData(data) {
    document.getElementById('about').innerText = data.about || 'No data available';
    loadChart('followersChart', data.followers.dates, data.followers.counts, 'Followers');
    loadChart('profileViewsChart', data.profileViews.dates, data.profileViews.counts, 'Profile Views');
    loadChart('postImpressionsChart', data.postImpressions.dates, data.postImpressions.counts, 'Post Impressions');
    loadChart('searchAppearancesChart', data.searchAppearances.dates, data.searchAppearances.counts, 'Search Appearances');
}

function loadChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: '#0073b1',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
