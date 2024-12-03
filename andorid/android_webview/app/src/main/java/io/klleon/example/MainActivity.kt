package io.klleon.example

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import org.mozilla.geckoview.GeckoResult
import org.mozilla.geckoview.GeckoRuntime
import org.mozilla.geckoview.GeckoSession
import org.mozilla.geckoview.GeckoSession.PermissionDelegate
import org.mozilla.geckoview.GeckoSession.PermissionDelegate.ContentPermission
import org.mozilla.geckoview.GeckoView


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                geckoViewScreen(
                    "https://your-sdk-page-url.com/"
                )
            }
        }
    }
}

@Composable
fun geckoViewScreen(url: String) {
    val context = LocalContext.current
    var permissionsGranted by remember { mutableStateOf(false) }

    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        permissionsGranted = permissions.values.all { it }
    }

    LaunchedEffect(Unit) {
        val requiredPermissions = arrayOf(
            Manifest.permission.RECORD_AUDIO
        )

        val missingPermissions = requiredPermissions.filter {
            ContextCompat.checkSelfPermission(context, it) != PackageManager.PERMISSION_GRANTED
        }

        if (missingPermissions.isNotEmpty()) {
            permissionLauncher.launch(missingPermissions.toTypedArray())
        } else {
            permissionsGranted = true
        }
    }

    AndroidView(
        factory = { ctx ->
            val geckoView = GeckoView(ctx)
            val geckoSession = GeckoSession()
            val geckoRuntime = GeckoRuntime.create(ctx)

            geckoSession.permissionDelegate = object : PermissionDelegate {
                private var callback: PermissionDelegate.Callback? = null

                override fun onAndroidPermissionsRequest(
                    session: GeckoSession,
                    permissions: Array<out String>?,
                    callback: PermissionDelegate.Callback
                ) {
                    this.callback = callback
                    val missingPermissions = permissions?.filter {
                        ContextCompat.checkSelfPermission(ctx, it) != PackageManager.PERMISSION_GRANTED
                    }

                    if (missingPermissions?.isNotEmpty() == true) {
                        permissionLauncher.launch(missingPermissions.toTypedArray())
                    } else {
                        callback.grant()
                    }
                }

                override fun onContentPermissionRequest(
                    session: GeckoSession,
                    permission: ContentPermission
                ): GeckoResult<Int> {
                    return GeckoResult.fromValue(ContentPermission.VALUE_ALLOW)
                }

                override fun onMediaPermissionRequest(
                    session: GeckoSession,
                    uri: String,
                    video: Array<out PermissionDelegate.MediaSource>?,
                    audio: Array<out PermissionDelegate.MediaSource>?,
                    callback: PermissionDelegate.MediaCallback
                ) {
                    callback.grant(null, audio?.getOrNull(0))
                }
            }

            geckoSession.open(geckoRuntime)
            geckoSession.loadUri(url)
            geckoView.setSession(geckoSession)

            geckoView
        },
        modifier = Modifier.fillMaxSize()
    )
}