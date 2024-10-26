function displayProfileData(data) {
    // Populate About Section
    document.getElementById('about').innerText = data.about || 'No data available';

    // Populate Connections & Followers Chart
    const ctx = document.getElementById('followersChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.followers.dates,
            datasets: [{
                label: 'Followers',
                data: data.followers.counts,
                borderColor: '#0073b1',
            }]
        }
    });
}
